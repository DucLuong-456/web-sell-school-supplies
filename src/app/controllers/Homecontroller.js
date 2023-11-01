const Product = require('../models/ProductModel')
const jwt= require('jsonwebtoken')
const {mutipleMongooseToObject} = require('../../util/mongoose')

const HomeController = {
    getAPIBook: async(req, res, next)=> {       
        Product.find({})
        .then(books => {
            
            res.json({  books: mutipleMongooseToObject(books)});
        })
        .catch(next);
        },
    // [Get => home]
    index: async(req, res, next)=> {   
        const books= await Product.find({});   
        const token = req.cookies.refreshtoken;
        let user;
        if(!token){
            user= {username: 'tài khoản'};
        }
        else{
            user= await jwt.verify(token,'secretKey');
        }
        //console.log(user)
        res.render('hometest',{  books: mutipleMongooseToObject(books),userInfor: user});
    },
    index1: async(req, res, next)=> {   
        const books= await Product.find({});   
        const token = req.cookies.refreshtoken;
        let user;
        if(!token){
            user= {username: 'tài khoản'};
        }
        else{
            user= await jwt.verify(token,'secretKey');
        }
        console.log(user)
        res.render('partials/header',{  books: mutipleMongooseToObject(books),userInfor: user});
    
    }
    
}
module.exports = HomeController;