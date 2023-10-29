const productRouter = require('express').Router()
const productController = require('../app/controllers/ProductController')


productRouter.get('/productsRelated',productController.getProductRelated)
productRouter.get('/',productController.getProduct)

module.exports = productRouter