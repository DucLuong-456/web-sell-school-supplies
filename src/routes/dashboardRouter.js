const express = require('express');
const dashboardRouter = express.Router();

const dashboardController = require('../app/controllers/dashboardController');
const auth = require('../middeware/auth');
const authAdmin = require('../middeware/authAdmin');

dashboardRouter.get('/products',auth,authAdmin, dashboardController.manageProducts);
dashboardRouter.get('/users',auth,authAdmin, dashboardController.manageUsers);
dashboardRouter.get('/orders',auth,authAdmin, dashboardController.manageOrder);
dashboardRouter.get('/categories',auth,authAdmin, dashboardController.manageCategories);
dashboardRouter.get('/transaction',auth,authAdmin, dashboardController.manageTransac);
dashboardRouter.get('/sales',auth,authAdmin, dashboardController.manageSales);
dashboardRouter.get('/analysts',auth,authAdmin, dashboardController.manageAnalysts);

dashboardRouter.delete('/bill/:id',auth,authAdmin, dashboardController.deleteBill);
dashboardRouter.delete('/user/:id',auth,authAdmin, dashboardController.deleteUser);

module.exports = dashboardRouter