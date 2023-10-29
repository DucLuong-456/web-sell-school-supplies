const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
  name: { type: String, maxLength: 255},
  email: { type: String, maxLength: 255},
  password: { type: String, maxLength: 255},
  address:{ type: String, maxLength: 255},
  phone_number:{type: String, maxLength: 255},
  role:{type: Number, default: 1},
  cart: {
    type: Array,
    default: []
}
}, {
  timestamps: true
});
module.exports = mongoose.model('Users', user);