const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderdetail = new Schema({
    orderID:{type: String, maxLength: 255},
    productID:{type: Date},
    price:{type: String},
    soluong:{type: String},
    total_money:{type: String}
},{
        timestamps: true
      });
module.exports = mongoose.model('ordersdetail', orderdetail);