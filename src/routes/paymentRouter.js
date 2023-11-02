const express = require('express');
const paymentRouter = express.Router();

const PaymentController = require('../app/controllers/PaymentController');
const auth = require('../middeware/auth');
const authAdmin = require('../middeware/authAdmin');

paymentRouter.get('/mypayment',auth,authAdmin, PaymentController.getPayment);


module.exports = paymentRouter;