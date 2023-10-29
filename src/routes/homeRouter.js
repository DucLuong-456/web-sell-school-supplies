const express = require('express');
const homeRouter = express.Router();

const HomeController = require('../app/controllers/Homecontroller');
homeRouter.get('/getAPIBook', HomeController.getAPIBook);
homeRouter.get('/test', HomeController.index1);
homeRouter.get('/', HomeController.index);

module.exports = homeRouter;