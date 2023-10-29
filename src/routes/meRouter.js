const express = require('express');
const meRouter = express.Router();

const MeController = require('../app/controllers/MeController');
const auth = require('../middeware/auth');
const authAdmin = require('../middeware/authAdmin');

meRouter.get('/stored/books',auth,authAdmin, MeController.storedBooks);
meRouter.get('/stored/users',auth,authAdmin, MeController.storedUsers);
meRouter.get('/stored/carts',auth,authAdmin, MeController.storedCarts);
meRouter.delete('/bill/:id',auth,authAdmin, MeController.deleteBill);
meRouter.delete('/user/:id',auth,authAdmin, MeController.deleteUser);

module.exports = meRouter;