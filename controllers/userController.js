const mongoose=require('mongoose')

const User=require('../models/userModel')

exports.user_signup=(req, res)=> {
    const errors = validationResult(req);
    //valid
    if (errors.isEmpty()) {
        console.log("Here")
        const fullname = req.body.fullname;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const username = req.body.username;
        const password = req.body.password;
        const role=req.body.role;
        console.log(password)
        bcryptjs.hash(password, 10, function (err, hash) {
            const data = new Register({
                fullname: fullname,
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