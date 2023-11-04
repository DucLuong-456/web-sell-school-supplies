
const Users = require('../models/userModel')
const Category = require('../models/CategoryModel')
const Order = require('../models/OrderModel')
const Cart = require('../models/cartModel')
const Product = require('../models/ProductModel')

const {mutipleMongooseToObject} = require('../../util/mongoose')
const dashboardController=  {
    deleteBill: async(req, res, next)=> {            
        await Cart.deleteOne({_id: req.params.id});
        res.redirect('/me/stored/carts');
        },
    deleteUser: async(req, res, next)=> {            
            await Users.deleteOne({_id: req.params.id});
            res.redirect('/dashboard/users');
            },
    // [Get => /news]
    manageProducts: async(req, res, next)=> {       
        const products= await Product.find({}); 
        res.render('dashboard/manage_product',{layout: false,
            products: mutipleMongooseToObject(products)});
        
        },
    manageUsers: async(req, res, next)=> {       
            const users= await Users.find({}); 
            res.render('dashboard/manage_user',{layout: false,
                users: mutipleMongooseToObject(users)
            });
        },
     manageCarts: async(req, res, next)=> {       
                const carts= await Cart.find({}); 
               
                res.render('dashboard/manage_category',{layout: false,
                    carts: mutipleMongooseToObject(carts)
             });
           },
    manageOrder: async(req, res, next)=> {       
            const orders= await Order.find({}); 
            res.render('dashboard/manage_order',{layout: false,
                orders: mutipleMongooseToObject(orders)
         });
       },
    manageCategories: async(req, res, next)=> {       
            const categories= await Category.find({});      
            res.render('dashboard/manage_category',{layout: false,
                categories: mutipleMongooseToObject(categories)
         });
       }
}

module.exports = dashboardController;