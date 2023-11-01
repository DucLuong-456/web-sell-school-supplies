const express = require('express');
const productRouter = express.Router();
const ProductController = require('../app/controllers/ProductController');
const auth = require('../middeware/auth');
const authAdmin = require('../middeware/authAdmin');
const multer  = require('multer');
//nơi upload file tại local: folder upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/img');
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname);
    }
  })
  const upload = multer({ storage: storage })

productRouter.get('/create',auth,authAdmin,ProductController.createProduct);
productRouter.post('/store',auth,authAdmin,upload.single('image'),ProductController.storeProduct);
productRouter.get('/:id/edit',auth,authAdmin,ProductController.editProduct);
productRouter.put('/:id',auth,authAdmin,upload.single('imageUp'),ProductController.updateProduct);
productRouter.delete('/:id',auth,authAdmin,ProductController.deleteProduct);
productRouter.get('/dodunghoctap/:slug', ProductController.show );
//productRouter.get('/docongnghe/:slug', ProductController.show2);

productRouter.get('/productsRelated',ProductController.getProductRelated)
productRouter.get('/allproduct',ProductController.getProduct)

productRouter.get('/', ProductController.index);

module.exports = productRouter;