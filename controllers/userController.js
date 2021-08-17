const User=require('../models/userModel');
const rating=require('../models/ratingModel');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailgun=require("mailgun-js");
const DOMAIN = "sandbox08e4a075b14f453e8e97d91b7fe9c453.mailgun.org";
const mg=mailgun({apiKey:"55c9e8b03b27bbf78c0836a885ff80ff-9776af14-5bf71c00",domain:DOMAIN});


//...........SIGNUP..............................................................................................
exports.user_signup=(req, res)=> {[
    check('username', "Username is required!").not().isEmpty(),
    check('email',"Invalid email").isEmail(),
    check('password',"Password is required").not().isEmpty()
]
    const errors = validationResult(req);
    //valid
    if (errors.isEmpty()) {
        const fullname = req.body.fullname;
        const age=req.body.age;
        const gender= req.body.gender;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const username = req.body.username;
        const password = req.body.password;
        console.log(password)
        bcryptjs.hash(password, 10, function (err, hash) {
            const data = new User({
                fullname: fullname,
                age:age,
                gender:gender,
                email: email,
                phone: phone,
                address: address,
                username: username,
                password: hash,
            });
            data.save()
                .then(function (result) {
                    res.status(201).json({success: true, message: "Customer resgistration is done successfully!!" })
                })
                .catch(function (err) {
                    res.status(500).json({ error: err })
                });
        })
    }
    else {
        //invalid
        console.log(errors.array())
        res.status(400).json(errors.array());
    }
}

//...............................LOGIN............................................................................

exports.user_login=(req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username })
        .then(function (userData) {
            if (userData === null) {
                return res.status(201).json({success: false, 
                    message: "Invalid Credentials!!" })
            }
            //if email exists
            bcryptjs.compare(password, userData.password, function (err, result) {
                if (result === false) {
                    //if password is wrong
                    return res.status(201).json({success: false, message: "Invalid credentials!!" })
                }
                // email and password match
                // generating token -ticket

                const token = jwt.sign({ userId: userData._id }, 'anysecretkey');
                return res.status(200).json({
                    success: true,
                    message: 'authorization success!!',
                    token: token,
                    userid:userData._id,
                    data:userData
                })
            })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
}
//............GET USER..............................................................................................


exports.get_all_users=(req,res)=>{
    
    User.find()
    .then(function(data){
        res.send({data,success: true});
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })

}

//..................GET SINGLE USER..................................................................................
exports.get_single_user=(req,res)=>{
    const userId=req.params.id;
    User.findOne({_id:userId}).then(function(userData){
        res.status(200).json({success: true,userData})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
    
}

//........................DELETE USER................................................................................
exports.user_delete=(req,res)=>{
    User.deleteOne({_id:req.params.id}).then(function(){
        res.send({success: true, message:"User Deleted!!"})
    })
}

//........................UPDATE USER.................................................................................
exports.user_update=(req,res)=>{
    const userId=req.params.id;
    User.updateOne({_id:userId},req.body)
    .then(function(success){
        res.status(200).json({success:true, message:"Updated successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({err:err})
    })
}

exports.getRatings=(req,res)=>{
    rating.findOne({productid : req.body.productid, userid : req.user._id}, function(err, rating){
        if(err) return res.send({
            success : false,
            message : err.message
        })
        if(!rating){
            return res.send({
                success : false,
                rating : null
            })
        }else{
            return res.send({
                success : true,
                rating : rating
            })
        }
      
    })
}

//.........................FORGOT PASSWORD...................................

exports.forgotPassword=(req,res)=>{
    const {email}=req.body;
    User.findOne({email}, (err,user)=>{
        if(err || !user){
            return res.status(400).json({error:"User with this email does not exists"});
        }
        const token=jwt.sign({_id:user._id}, process.env.RESET_PASSOWRD_KEY, {expiresIn:'20m'});
        const data={
            from:'sariyanmagar@gmail.com',
            to:email,
            subject:'email activation link',
            html:`
                <h2>Please click on given link to reset your password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
            `
        };
        return user.updateOne({resetLink:token}, function(err, success){
            if(err){
                return res.status(400).json({error:"reset password link error"});
            }
            else{
                mg.messages().send(data,function (error,body){
                    if(error){
                        return res.json({
                            error:err.message
                        })
                    }
                return res.json({message:'Email has been sent, kindly follow the instruction'});
            });
        }
    })
})
}