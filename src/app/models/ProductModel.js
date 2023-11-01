const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String, maxLength: 255},
  nhacungcap: { type: String, maxLength: 255},
  nhaXB: { type: String, maxLength: 255},
  tacgia: { type: String, maxLength: 255},
  loaibia: { type: String, maxLength: 255},
  image: {type: String, maxLength: 255},
  giaban:{type: String, maxLength: 255},
  soluongton:{type: String, maxLength: 255},
  bo:{type: String, maxLength: 255},
  slug: {type: String, maxLength: 255 },//slug:'name', unique: true
  categoryID: {type: String},
  xuatxu: {type: String},
  thuonghieu: {type: String}
},{
  timestamps: true
});
module.exports = mongoose.model('products', Product);