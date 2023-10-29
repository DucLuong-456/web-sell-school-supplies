const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Fashion = new Schema({
  name:{type: String},
  giaBan:{type: Number},
  thuongHieu:{type: String},
  image: {type: String},
  nhaCungCap:{type: String},
  xuatXu:{type: String},
  slug:{type: String},
  createAt: { type: Date, default: Date.now},
  updateAt: { type: Date, default: Date.now},
  categoryID: {type: String}

});
module.exports = mongoose.model('fashions', Fashion);