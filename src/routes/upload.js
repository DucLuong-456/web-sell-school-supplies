
const multer  = require('multer');
const uploadfile = (app)=>{
//nơi lưu trữ tại local
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/upload');
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })
  
  app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.send('upload success!');
  })
}

module.exports= {uploadfile};