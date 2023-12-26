const Order = require('../models/OrderModel')
const Orderdetail = require('../models/OrderDetailModel')
const User = require('../models/userModel')
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose')
const Cart = require('../models/cartModel')
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Aa8vShLXur97hpRITy-40QbR01jhmCX3SOdtM4gAg2KuwdblzEtuvgiVy-VRdIi-PWjv1ttUvHYzXBlI',
  'client_secret': 'EIKh3HT9B4rpm0H1LLiL1MqN0ePJnIYiO9jXZcbVyZeE9Ph75mAzJU09y29mgSzohHDhW1FiLFBIr-gF'
});

const PaymentController ={
    renderPayment: async (req,res)=>{
        //const userId = req.user.id
        const carts = await Cart.find({userId: req.user.id})
        const soluong = carts.length
        return res.render('menu/thanhToan', {carts: mutipleMongooseToObject(carts),soluong: soluong })
    },
    getAllPayment: async (req,res)=>{
        const orders = await Order.find({})
        return res.json(orders)
    },
    getPayment: async (req,res)=>{
        const userId = req.user.id
        const orders = await Order.find({userID: userId})
        return res.render('payment/my_list_order',{orders: mutipleMongooseToObject(orders)})
    },
    createPayment: async (req,res)=>{
        const userId = req.user.id
        const user = await User.findOne({_id: userId})
        const {name, address, email,phone_number} = user
        const cart = await Cart.find({userId: req.user.id})
        let total_money=0;
        cart.forEach((item)=>{
            total_money +=parseFloat(item.giaBan) * parseInt(item.soLuong);
        })
        
        const order = new Order({
            userID: userId,name, address, email,phone_number,total_money,cart
        })
        await order.save();
        await Cart.deleteMany({userId: req.user.id})
        return res.send("ORDER SUCCESS!")
    },
    getDetailPayment: async (req,res)=>{
        try{
            const orderID = req.params.id
            const order = await Order.findOne({_id: orderID})
            const carts = order.cart
            //ghi chú quan trọng: với object array được truy xuất từ object thì không cần toObject
            //vì chúng không phải đối tượng mongoose, (1 ngày fix)
           return res.render('dashboard/detailOrder',{layout: false, carts: carts, order: mongooseToObject(order)})
        }
        catch(err){
            return res.json({msg: err})
        }
    },
    changeStatusOrder: async (req,res)=>{
        try {
            const orderID = req.params.id
            const orderStatusUpdate= await Order.findOneAndUpdate({_id: orderID},{status: "Đang giao"},{new: true})
            if(!orderStatusUpdate) return res.json({msg: "Không tìm thấy đơn hàng!"})
            return res.json({msg: "Change status success!"})
        } catch (error) {
            return res.json({msg: error})
        }
    },
    payOnline: async(req,res)=>{
        //1)dau tien lay id nguoi dung,
        //2) loc san pham trong gio hang theo nguoi dung => cart by userID
        //3) bien doi object:
            /*          [{
                            "name": "Iphone 4S",
                            "sku": "001",
                            "price": "25.00",
                            "currency": "USD",
                            "quantity": 1
                        }]
            */
        let cartByUserId = await Cart.find({userId: req.user.id})
        let total=0; //VND => USD
        
        function convertVNDtoUSD(amountVND) {
            var exchangeRate = 23000;
            var amountUSD = amountVND / exchangeRate;
            amountUSD = Math.round(amountUSD)
            return amountUSD;
          }
          
        let cartForPaypal = cartByUserId.map((item)=>{
            var priceForUSD = convertVNDtoUSD(item.giaBan)
            total=  total + parseFloat(item.giaBan)* parseInt(item.soLuong);
            return {
                    "name": `${item.name}`,
                    "sku": "001",
                    "price": `${priceForUSD}`,
                    "currency": "USD",
                    "quantity": item.soLuong
            }
        })
        
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/payment/paysuccess",
                "cancel_url": "http://localhost:3000/payment/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": cartForPaypal
                },
                "amount": {
                    "currency": "USD",
                    "total": `${convertVNDtoUSD(total)}`
                },
                "description": "Iphone cũ giá siêu rẻ"
            }]
        };
        

        //Xử lý payment method
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
    
            }
        });  

    },

    paySuccess: async(req,res)=>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    //Xử lý bên method GET
    let cartByUserId = await Cart.find({userId: req.user.id})
    let total=0; //VND => USD
    function convertVNDtoUSD(amountVND) {
            var exchangeRate = 23000;
            var amountUSD = amountVND / exchangeRate;
            amountUSD = Math.round(amountUSD)
            return amountUSD;
    }
          
    cartByUserId.forEach((item)=>{
            total= total + parseFloat(item.giaBan)* parseInt(item.soLuong);
    })


    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": `${convertVNDtoUSD(total)}`
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, async(error, payment)=>{
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            // xử lý đơn hàng
            const userId = req.user.id
            const user = await User.findOne({_id: userId})
            const {name, address, email,phone_number} = user
            const cart = await Cart.find({userId: req.user.id})
            let total_money=0;
            cart.forEach((item)=>{
                total_money +=parseFloat(item.giaBan) * parseInt(item.soLuong);
            })
            let status ="completed"
            let payment="Online paypal"
            const order = new Order({
                userID: userId,name, address, email,phone_number,total_money,cart,status,payment
            })
            await order.save();
            await Cart.deleteMany({userId: req.user.id})
            console.log(JSON.stringify(payment));
            res.send('Success (Mua hàng thành công)');
        }
    });
    },
    payCancel: async(req,res)=>{
        res.send('Cancelled (Đơn hàng đã hủy)')
    }
}

module.exports = PaymentController