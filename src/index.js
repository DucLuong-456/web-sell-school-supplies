const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require("express-handlebars");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Aa8vShLXur97hpRITy-40QbR01jhmCX3SOdtM4gAg2KuwdblzEtuvgiVy-VRdIi-PWjv1ttUvHYzXBlI',
  'client_secret': 'EIKh3HT9B4rpm0H1LLiL1MqN0ePJnIYiO9jXZcbVyZeE9Ph75mAzJU09y29mgSzohHDhW1FiLFBIr-gF'
});

const port = 3000;
const app = express();
const routes = require('./routes');
const db = require('./config/db')
//const upload =require('../src/routes/upload')
//connect db
db.connect();
//upload.uploadfile(app);

//cho phep xem file tinh, connect to css
app.use(express.static(path.join(__dirname,'public')));
//
app.use(express.json());
//http logger morgan 
app.use(morgan('combined'))

//cookie
app.use(cookieParser());
//urlencoded + json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride('_method'));
//template engine
app.engine(".hbs", engine(
  {
    extname: '.hbs',
    helpers: {
    sum: (a,b) => a+b
  }
}

));
app.set("view engine", ".hbs");
app.set('views', path.join(__dirname, '/resources/views'));


//uploadFile storage


//Route init       
routes(app);       

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

