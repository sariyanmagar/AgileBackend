const mongoose=require('mongoose');
const User=require('../models/adminModel');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth=require('../middleware/auth');
const Admin = require('../models/adminModel');

//...........SIGNUP..............................................................................................
exports.user_signup=(req, res)=> {[
    check('admin_name', "Username is required!").not().isEmpty(),
    check('admin_password',"Password is required").not().isEmpty()
]
    const errors = validationResult(req);
    //valid
    if (errors.isEmpty()) {
        const admin_name = req.body.admin_name;
        const admin_password= req.body.admin_password;
        bcryptjs.hash(admin_password, 10, function (err, hash) {
            const data = new User({
                admin_name: admin_name,
                admin_password:admin_password,
            });
            data.save()
                .then(function (result) {
                    res.status(201).json({success: true, message: "Admin resgistration is done successfully!!" })
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
    const admin_name = req.body.admin_name;
    const admin_password = req.body.admin_password;
    User.findOne({ admin_name: admin_name })
        .then(function (userData) {
            if (userData === null) {
                return res.status(201).json({success: false, 
                    message: "Invalid Credentials!!" })
            }
            //if email exists
            bcryptjs.compare(admin_password, userData.admin_password, function (err, result) {
                if (result === false) {
                    //if password is wrong
                    return res.status(201).json({success: false, message: "Invalid credentials!!" })
                }
                // email and password match
                // generating token -ticket

                const token = jwt.sign({ adminId: userData._id }, 'anysecretkey');
                return res.status(200).json({
                    success: true,
                    message: 'authorization success!!',
                    token: token,
                    adminid:userData._id,
                    data:userData
                })
            })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
}
//............GET USER..............................................................................................
exports.get_users=auth.verifyAdmin,(req,res)=>{
    Admin.findOne({_id : req.admin._id})
    .then(function(userData){
        res.json({
            success:true,
            user:userData
        })
    })
}


//..................GET SINGLE USER..................................................................................
exports.get_single_admin=(req,res)=>{
    const adminId=req.params.id;
    Admin.findOne({_id:adminId}).then(function(userData){
        res.status(200).json(userData)
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
    
}

//........................DELETE USER................................................................................
exports.admin_delete=(req,res)=>{
    User.deleteOne({_id:req.params.id}).then(function(){
        res.send("Admin Deleted!!")
    })
}

//........................UPDATE USER.................................................................................
exports.admin_update=(req,res)=>{
    const adminId=req.params.id;
    Admin.updateOne({_id:adminId},req.body)
    .then(function(success){
        res.status(200).json({message:"Updated successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({err:err})
    })
}