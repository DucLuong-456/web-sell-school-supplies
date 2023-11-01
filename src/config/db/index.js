const mongoose = require('mongoose');
require('dotenv').config()
//const URI = process.env.MONGO_URI
async function connect() {
  try {
    //await mongoose.connect("mongodb+srv://f8Education:Luong321@cluster0.y7gq4w5.mongodb.net/e-commerce");
    await mongoose.connect("mongodb+srv://ducluong1032002:1234@cluster0.s7xq57e.mongodb.net/Web_ban_hang_Nodejs?retryWrites=true&w=majority");
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("failed to connect to mongodb");
  }
}
module.exports = { connect };
