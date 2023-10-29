const Book = require('../models/Book')
const Fashion = require('../models/Fashion')
const Cart = require('../models/cartModel')
const Users = require('../models/userModel')

const {mutipleMongooseToObject} = require('../../util/mongoose')
const MeController=  {
    deleteBill: async(req, res, next)=> {            
        await Cart.deleteOne({_id: req.params.id});
        res.redirect('/me/stored/carts');
        },
    deleteUser: async(req, res, next)=> {            
            await Users.deleteOne({_id: req.params.id});
            res.redirect('/me/stored/users');
            },
    // [Get => /news]
    storedBooks: async(req, res, next)=> {       
        const books= await Book.find({}); 
        const fashions= await Fashion.find({}); 
        res.render('me/stored-books',{
            books: mutipleMongooseToObject(books)
        , fashions:mutipleMongooseToObject(fashions)});
        
        },
        storedUsers: async(req, res, next)=> {       
            const users= await Users.find({}); 
            res.render('me/stored-users',{
                user: mutipleMongooseToObject(users)
            });
        },
        storedCarts: async(req, res, next)=> {       
                const carts= await Cart.find({}); 
               
                res.render('me/stored-carts-buy',{
                    carts: mutipleMongooseToObject(carts)
             });
           },
}

module.exports = MeController;