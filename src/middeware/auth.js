const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
    try{
        //const token = req.header('Authorization');
        const token = req.cookies.refreshtoken;
        if(!token) return res.json({msg: 'Xác thực chưa phù hợp!'});

        jwt.verify(token,'secretKey',(err,user)=>{
            if(err) return res.json({msg: "Xác thực chưa phù hợp!"});
            req.user =user;
            next();
        })
        
    }catch(err){
        return res.json({mgs: err.message});
    }
}

module.exports =auth;