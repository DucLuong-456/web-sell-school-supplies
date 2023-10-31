const express = require('express');
const bookRouter = express.Router();
const BookController = require('../app/controllers/BookController');
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

bookRouter.get('/create',auth,authAdmin,BookController.createBook);
bookRouter.post('/store',auth,authAdmin,upload.single('image'),BookController.storeBook);
bookRouter.get('/:id/edit',auth,authAdmin,BookController.editBook);
bookRouter.put('/:id',auth,authAdmin,upload.single('imageUp'),BookController.updateBook);
bookRouter.delete('/:id',auth,authAdmin,BookController.deleteBook);
bookRouter.get('/dodunghoctap/:slug', BookController.show );
bookRouter.get('/docongnghe/:slug', BookController.show2);
bookRouter.get('/', BookController.index);

module.exports = bookRouter;