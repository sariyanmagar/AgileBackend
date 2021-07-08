const mongoose=require('mongoose')
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User=require('../models/userModel')

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
        const gender= req.body.gender;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const username = req.body.username;
        const password = req.body.password;
        const role=req.body.role;
        console.log(password)
        bcryptjs.hash(password, 10, function (err, hash) {
            const data = new User({
                fullname: fullname,
                gender:gender,
                email: email,
                phone: phone,
                address: address,
                username: username,
                password: hash,
                role:role
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

//...............................LOGIN........................................................................

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
                    Usertype:userData.role,
                    userid:userData._id,
                    data:userData
                })
            })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
}

exports.get_user=(req,res)=>{
    User.findOne({_id:req.user._id})
    .then(function(userData){
        res.json({
            success:true,
            user:userData
        })
    })
}