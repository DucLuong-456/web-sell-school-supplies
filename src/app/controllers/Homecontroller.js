const Product = require('../models/ProductModel')
const Category = require('../models/CategoryModel')
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
        const books= await Product.find({}).limit(5);  
        const categories =await Category.find({})
        if(!Category) return res.json({msg: "category do not exist!"})
        const supplies = await Product.find({categoryID: categories[1]._id}).limit(5) 
        const stationeries = await Product.find({categoryID: categories[2]._id}).limit(5) 
        const token = req.cookies.refreshtoken;
        let user;
        if(!token){
            user= {username: 'tài khoản'};
        }
        else{
            user= await jwt.verify(token,'secretKey');
        }
        //console.log(user)
        res.render('hometest',{  books: mutipleMongooseToObject(books),supplies: mutipleMongooseToObject(supplies),stationeries: mutipleMongooseToObject(stationeries),userInfor: user});
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
        //console.log(user)
        res.render('partials/header',{data: mutipleMongooseToObject(books),userInfor: user});
    
    }
    
}
module.exports = HomeController;