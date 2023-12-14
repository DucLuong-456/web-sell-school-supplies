const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order = new Schema({
    userID: {type: String},
    name: {type: String},
    email: {type: String},
    phone_number:{type: String},
    address:{type: String},
    note: {type: String},
    order_date: {
      type: Date
    },
    total_money:{type: String},
    cart: {
      type: []
    },
    status:{
        type: String,
        default: "Đang chờ"
    },
    payment: {
      type: String, 
      default: "COD"}
},{
        timestamps: true
      });
module.exports = mongoose.model('orders', order);