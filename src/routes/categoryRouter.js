const express = require('express');
const categoryRouter = express.Router();

const categoryController = require('../app/controllers/CategoryController');
const auth = require('../middeware/auth');
const authAdmin = require('../middeware/authAdmin');

categoryRouter.get('/category',auth,authAdmin, categoryController.getCategory);
categoryRouter.get('/create',auth,authAdmin, categoryController.getCreateCategory);
categoryRouter.post('/create',auth,authAdmin, categoryController.createCategory);
categoryRouter.delete('/delete/:id',auth,authAdmin, categoryController.deleteCategory);
categoryRouter.get('/update/:id',auth,authAdmin, categoryController.getUpdateCategory);
categoryRouter.put('/update/:id',auth,authAdmin, categoryController.updateCategory);

module.exports = categoryRouter;