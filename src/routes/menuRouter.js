const express = require('express');
const menuRouter = express.Router();

const MenuController = require('../app/controllers/MenuController');
menuRouter.get('/lienhe', MenuController.getLienHe);
menuRouter.get('/tuyendung', MenuController.getTuyenDung);

module.exports = menuRouter;