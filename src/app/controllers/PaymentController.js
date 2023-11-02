const Order = require('../models/OrderModel')
const Orderdetail = require('../models/OrderDetailModel')
const User = require('../models/userModel')
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose')
const Cart = require('../models/cartModel')
const PaymentController ={
    getAllPayment: async (req,res)=>{
        const orders = await Order.find({})
        return res.json(orders)
    },
    getPayment: async (req,res)=>{
        const userId = req.user.id
        const orders = await Order.find({userID: userId})
        return res.json(orders)
    },
    createPayment: async (req,res)=>{
        const userId = req.user.id
        const user = await User.findOne({_id: userId})
        const {name, address, email,phone_number} = user
        const cart = await Cart.find({userId: req.user.id})
        const {total_money,hinhthuc} = req.body
        const order = new Order({
            userID: userId,name, address, email,phone_number,total_money,hinhthuc
        })
        const orderDetail = new Orderdetail({

        })
        return res.json(order)
    }
}

module.exports = PaymentController