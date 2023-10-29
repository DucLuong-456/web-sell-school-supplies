const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bill = new Schema({
    email:{type: String, maxLength: 255},
    name: {type: String, maxLength: 255},
    sdt:{type: String, maxLength: 255},
    diachi:{type: Number, default:1},
    tinhthanh: {type: String},
    quanhuyen: {type: String},
    phuongxa: {type: String},
    ghichu: {type: String},
    hinhthucthanhtoan: {type: String},
    createAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now}
});
module.exports = mongoose.model('bills', bill);