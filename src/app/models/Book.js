const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Book = new Schema({
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
  createAt: { type: Date, default: Date.now},
  updateAt: { type: Date, default: Date.now},
  categoryID: {type: String}
});
module.exports = mongoose.model('books', Book);