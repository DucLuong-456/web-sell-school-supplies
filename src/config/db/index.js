const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect("mongodb+srv://f8Education:Luong321@cluster0.y7gq4w5.mongodb.net/e-commerce");
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("failed to connect to mongodb");
  }
}
module.exports = { connect };
