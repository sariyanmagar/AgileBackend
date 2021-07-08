const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

module.exports.verifyUser=function(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token,'anysecretkey');
        User.findOne({_id:data.userId})
        .then(function(userData){
            req.user=userData;
            next()
        })
        .catch(function(err){
            res.status(401).json({error:err});
        })
    }
    catch(err){
        res.status(401).json({error:err})
    }
}

module.exports.verifyAdmin=function(req,res,next){
    if(!req.user){
        return res.status(401).json({message:"Unuthorized(Login failed)!!"})
    }
    else if(req.user.role!=="Admin"){
        return res.status(401).json({message:"Unauthorized( Not an Admin!"})
    }
    next();
}