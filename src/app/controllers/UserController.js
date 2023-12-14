const users = require('../models/userModel');
const Cart = require('../models/cartModel')
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {mongooseToObject} = require('../../util/mongoose')


const UserController = {

    edit: async (req,res)=>{
        const user= await users.findById(req.params.id);
        res.render('me/edit-users', {layout: false,user: mongooseToObject(user)});
    },
    update: async(req,res)=>{
        try{
            await users.updateOne({_id: req.params.id}, req.body);
            res.redirect('/dashboard/users');
        }catch(err){
            console.log(err.message);
        }
    }
    ,
    getRegister: async (req, res)=>{    
        res.render('login/register',{layout: false});
    },

    getLogin: async (req, res)=>{    
        res.render('login/login',{layout: false});
    },

    createUser: async(req,res)=>{
        try{
            const {name, email,password,address, phone_number} = req.body;
            const user= await users.findOne({name: name});
            //console.log(user)
            if(user) return res.json("msg: Đã tồn tại tài khoản");
            //logic
            if(password.length <6) return res.json("msg: Mat khau < 6 ki tu");
            
            const passwordHash = await bcrypt.hash(password,10);
            const newUser = new users({
                name, email, password: passwordHash, address, phone_number
            })
            await newUser.save();
            //res.json("msg: tao tài khoản thành công");

            //Tạo jsonwebtoken để xác thực
            const accesstoken = createAccessToken({id: newUser._id});
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                //path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            //res.json({accesstoken})
            res.redirect('/user/login');

        }
        catch(err){
            return res.json("msg: loi server")
        }
        

    },

    login: async(req, res)=>{
        try{
            const {name, password} = req.body;
            const user= await users.findOne({name: name});
            if(!user) return res.json({msg:" Không tồn tại tài khoản này", status: 'fail'});
            //logic
            
           //oke
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.json({msg: "Mat khau nhap sai", status: 'fail'});
            //res.json("msg: login sucesss!");
            //
            const accesstoken = createAccessToken({id: user._id,username: user.name})
            const refreshtoken = createRefreshToken({id: user._id,username: user.name})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
               // path: '/user/refresh_token'
            })
            //variable check login
            res.cookie('isLogin', true)
            
            return res.json({msg: "login sucessed!",status: "sucesss",role: user.role})
        }
        catch(err){
            return res.json({msg: "loi server"})
        }
    }
    ,
    logout: async(req,res)=>{
        try{
            res.clearCookie('refreshtoken');
            res.clearCookie('isLogin');
            res.redirect('/');

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    islogin: async(req,res)=>{
        try{
            const isLogin= req.cookies.isLogin
            if(!isLogin)
                return res.json({isLogin: false});

            return res.json({isLogin: true});

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
    ,
    //đang thử nghiệm addcart
    addcart: async(req,res)=>{
        try {
            const user = await users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})
            
            //add cart
            const {productId,name, image,giaBan,soLuong}= req.body;
            const product = await Cart.findOne({_id: productId});
            //kiem tra san pham da co trong gio hang
            if(product) return res.json({"msg": "Đã tồn tại san pham trong gio"});
            //san pham chua co trong gio hang
            const newCart= new Cart({
                productId,name, image,giaBan,soLuong
            });
            await newCart.save();

            //add cart to user
            const products = await Cart.find({});
            await users.findOneAndUpdate({_id: req.user.id}, {
                cart: products
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    ,
    //trả về user infor
    getUserIf: async(req,res)=>{
        const token = req.cookies.refreshtoken;
        let user;
        if(!token){
            user= {username: 'Tài khoản'};
        }
        else{
            user= await jwt.verify(token,'secretKey');
        }
        const user_role = await users.findOne({_id: user.id});
        //console.log(user_role);
        return res.json({UserInfor: user,user_role});
    }
    ,
    refreshToken: async(req,res)=>{
        res.json(req.header("Authorization"))
    },
    uploadFile: async(req,res)=>{
        res.render('upload')
    },
    getDashBoard: async(req,res)=>{
        res.render('dashboard/dashboardSidebar',{layout: false})
//res.send(7777)
    }
    
}

const createAccessToken = (user)=>{
    return jwt.sign(user,'secretKey',{expiresIn: '10m'});
 }

const createRefreshToken = (user)=>{
    return jwt.sign(user,'secretKey',{expiresIn: '7d'});
 }


module.exports = UserController;