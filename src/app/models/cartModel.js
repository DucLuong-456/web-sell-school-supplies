const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cart = new Schema({
    masanpham:{type: String, maxLength: 255},
    name: {type: String, maxLength: 255},
    giaBan:{type: String, maxLength: 255},
    soLuong:{type: Number, default:1},
    image: {type: String},
    userId: {type: String},
}, {
    timestamps: true
  });
module.exports = mongoose.model('carts', cart);