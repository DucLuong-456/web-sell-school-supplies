const express = require('express');
const cartRouter = express.Router();
const auth = require('../middeware/auth');
const CartController = require('../app/controllers/CartController');

cartRouter.delete('/deletecart',auth,CartController.deleteItem);
cartRouter.post('/addcart',auth,CartController.addItemGioHang); 
cartRouter.get('/pay',CartController.getPay);
cartRouter.get('/',auth,CartController.getGioHang);

module.exports = cartRouter;