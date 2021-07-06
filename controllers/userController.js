const mongoose=require('mongoose')
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const User=require('../models/userModel')

exports.user_signup=(req, res)=> {
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