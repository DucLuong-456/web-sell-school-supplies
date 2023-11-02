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
        return res.json(orders)

        // const cart = await Cart.find({userId: req.user.id})
        // let total_money=0;
        // cart.forEach((item)=>{
        //     total_money +=parseFloat(item.giaBan) * parseInt(item.soLuong);
        // })
        // return res.json({cart,total_money})
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
        return res.json(order)
    },
    getDetailPayment: async (req,res)=>{
         const orderID = req.params.id
         const order = await Order.findOne({_id: orderID})
         const carts = order.cart
         //const carts1 = cart.cart
        //const carts = await Cart.find({userId: req.user.id})

        //return res.json(carts)
        return res.render('dashboard/detailOrder',{layout: false, carts: mutipleMongooseToObject(carts), order: mongooseToObject(order)})
    }

}

module.exports = PaymentController