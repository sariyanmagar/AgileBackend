const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

module.exports.verifyCustomer=function(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token,'anysecretkey');
        User.findOne({_id:data.userId})
        .then(function(userData){
            req.customer=userData;
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