const mongoose=require('mongoose');
const Admin=require('../models/adminModel');
const {check,validationResult}=require('express-validator');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth');

//..................ADMIN SIGNUP....................................

exports.admin_signup=(req,res)=>{[
    check('username',"Username is required!").not().isEmpty(),
    check('password',"Password is required").not().isEmpty()
    ]
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const fullname = req.body.fullname;
        const gender= req.body.gender;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const username = req.body.username;
        const password = req.body.password;
        console.log(password)
        bcryptjs.hash(password,10,function(err,hash){
            const data = new Admin({
                fullname: fullname,
                gender:gender,
                email: email,
                phone: phone,
                address: address,
                username: username,
                password: hash,
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

exports.admin_login=(req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    Admin.findOne({ username: username })
        .then(function (adminData) {
            if (adminData === null) {
                return res.status(201).json({success: false, 
                    message: "Invalid Credentials!!" })
            }
            //if email exists
            bcryptjs.compare(password, adminData.password, function (err, result) {
                if (result === false) {
                    //if password is wrong
                    return res.status(201).json({success: false, message: "Invalid credentials!!" })
                }
                // email and password match
                // generating token -ticket

                const token = jwt.sign({ adminId: adminData._id }, 'anysecretkey');
                return res.status(200).json({
                    success: true,
                    message: 'authorization success!!',
                    token: token,
                    adminId:adminData._id,
                    data:adminData
                })
            })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
}
//............GET USER..............................................................................................
exports.get_admins=auth.verifyAdmin,(req,res)=>{
    Admin.findOne({_id : req.admin._id})
    .then(function(userData){
        res.json({
            success:true,
            admin:userData
        })
    })
}


//..................GET SINGLE USER..................................................................................
exports.get_single_admin=(req,res)=>{
    const adminId=req.params.id;
    Admin.findOne({_id:adminId}).then(function(adminData){
        res.status(200).json({success: true, adminData})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
    
}

//........................DELETE USER................................................................................
exports.admin_delete=(req,res)=>{
    Admin.deleteOne({_id:req.params.id}).then(function(){
        res.send({success: true, message:"User Deleted!!"})
    })
}

//........................UPDATE USER.................................................................................
exports.admin_update=(req,res)=>{
    const adminId=req.params.id;
    Admin.updateOne({_id:adminId},req.body)
    .then(function(success){
        res.status(200).json({success:true,message:"Updated successfully!!"})
    })
    .catch(function(err){
        res.status(500).json({err:err})
    })
}
