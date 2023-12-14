const Order = require('../models/OrderModel')
const Orderdetail = require('../models/OrderDetailModel')
const User = require('../models/userModel')
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose')
const Cart = require('../models/cartModel')
const PaymentController ={
    renderPayment: async (req,res)=>{
        //const userId = req.user.id
        const carts = await Cart.find({userId: req.user.id})
        const soluong = carts.length
        return res.render('menu/thanhToan', {carts: mutipleMongooseToObject(carts),soluong: soluong })
    }
    ,
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
        return res.json(order)
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
    }
    ,
    changeStatusOrder: async (req,res)=>{
        try {
            const orderID = req.params.id
            const orderStatusUpdate= await Order.findOneAndUpdate({_id: orderID},{status: "Đang giao"},{new: true})
            if(!orderStatusUpdate) return res.json({msg: "Không tìm thấy đơn hàng!"})
            return res.json({msg: "Change status success!"})
        } catch (error) {
            return res.json({msg: error})
            
        }
    }
}

module.exports = PaymentController