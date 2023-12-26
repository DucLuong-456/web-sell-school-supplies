const express = require('express');
const paymentRouter = express.Router();

const PaymentController = require('../app/controllers/PaymentController');
const auth = require('../middeware/auth');
const authAdmin = require('../middeware/authAdmin');
//render payment
paymentRouter.get('/getpayment',auth,PaymentController.getPayment);
paymentRouter.get('/detailorder/:id',auth,PaymentController.getDetailPayment);
paymentRouter.get('/getallpayment',auth,authAdmin, PaymentController.getAllPayment);
paymentRouter.post('/create',auth, PaymentController.createPayment);
paymentRouter.put('/:id',PaymentController.changeStatusOrder)
paymentRouter.post('/payonline',auth,PaymentController.payOnline)
paymentRouter.get('/paysuccess',auth,PaymentController.paySuccess)
paymentRouter.get('/cancel',PaymentController.payCancel)


paymentRouter.get('/',auth, PaymentController.renderPayment);

module.exports = paymentRouter;