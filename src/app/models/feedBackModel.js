const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedback = new Schema({
    name:{type: String ,maxLength: 255},
    email:{type: String ,maxLength: 255},
    sdt:{type: String ,maxLength: 255},
    note:{type: String ,maxLength: 255},
    createAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now}
});
module.exports = mongoose.model('feedbacks', feedback);