const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const oder = new Schema({
    madonhang:{type: String, maxLength: 255},
    ngaydat:{type: Date},
    address:{type: String},
    total:{type: String},
    status:{type: String}
},{
        timestamps: true
      });
module.exports = mongoose.model('oders', oder);