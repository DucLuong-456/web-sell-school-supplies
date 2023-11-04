const User = require('../models/userModel');
const Cart = require('../models/cartModel')


const {mutipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')


const CartController ={
    getGioHang: async(req,res)=>{
        const products = await Cart.find({userId: req.user.id});
        res.render('giohang',{products: mutipleMongooseToObject(products)});
    },
    addItemGioHang: async(req,res)=>{
        try{
            const user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})
            const userId = req.user.id
            const {name, image,giaBan,soLuong}= req.body;

            const product = await Cart.findOne({name: name, userId: userId});
            //kiem tra san pham da co trong gio hang
            if(product) return res.json({msg: "Đã tồn tại sản phẩm trong giỏ hàng",status: false});
            //san pham chua co trong gio hang
            const newCart= new Cart({
                userId,name, image,giaBan,soLuong
            });
            await newCart.save()
            return res.json({msg: "add to cart sucessed!"});
        }
        catch(err){
            return res.json({msg:"loi server",status: true})
        }
    },
    deleteItem: async(req,res)=>{
        await Cart.deleteOne({_id: req.body.id});
        res.redirect('/cart');
    }
    ,
    getPay: async(req,res)=>{
        const carts = await Cart.find({});
        const SoLuongSP={SoLuongSP: await Cart.find({}).count()};
        res.render('menu/thanhtoanrieng',{carts: mutipleMongooseToObject(carts),SoLuongSP});
    }
}

module.exports = CartController;