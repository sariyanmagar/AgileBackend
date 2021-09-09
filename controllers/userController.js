const User=require('../models/userModel');
const rating=require('../models/ratingModel');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken')
const {sendMailMessage} = require('../utils/mail')
const {verifyToken}=require('../utils/token')



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
        const path=req.file.path;
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
                profile:req.file.path,
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

//..................................GET RATINGS....................................
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

//....................................CHANGE PASSWORD...............................................................
exports.change_password=async(req,res)=>{
let { userId, oldPassword, newPassword }=req.body;
if (!userId || !oldPassword || !newPassword) {
  return res.json({ message: "All filled must be required" });
} else {
  const data = await User.findOne({ _id: userId });
  if (!data) {
    return res.json({
      error: "Invalid user",
    });
  } else {
    const oldPassCheck = await bcryptjs.compare(oldPassword, data.password);
    if (oldPassCheck) {
      newPassword = bcryptjs.hashSync(newPassword, 10);
      let passChange = User.findByIdAndUpdate(userId, {
        password: newPassword,
      });      
      passChange.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "Password updated successfully" });
      });
    } else {
      return res.json({
        error: "Your old password is wrong!!",
      });
    }
  }
}
}


//......................................RESET PASSWORD..............................................................

exports.verifyEmail=async(req,res)=>{
    try{
        let email=req.body['email'];
        let user=await User.findOne({"email":email})
        if(user != null){
            let token = jwt.sign({"email":email},'resetKey',{expiresIn:"15m"})
        let content ={
        //   "heading":"Password Reset Link",
          "greeting":"Dear Sir/Madam!",
          "link":"http://localhost:3000/passwordreset/"+token,
          "task":"Email Recovery"
        }
        sendMailMessage("Recovery",email,content)

       return res.status(200).json({
           "success":true,
           "message":"Recovery mail has been sent to your email address."})
    }
    else
    {
      return res.status(202).json({
          "success":false,
          "message":"Email Address doesnot exist."})
    }
  }
  catch(err)
  {
    return res.status(404).json({
        "success":false,
        "message":err})
  }
}

exports.resetPassword = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let newPassword = req.body['newPassword'];
            let confirmPassword = req.body['confirmPassword'];
            let resetToken = req.body['resetToken'];
            console.log(resetToken)
            let verifyReset = await verifyToken(resetToken, "resetKey")

            let errorBox = {};
            if (newPassword != confirmPassword) {
                errorBox['newPassword'] = "Password MisMatch!!";
            }
            if (verifyReset == "Token Expired!!") {
                errorBox['token'] = "Request Time Out!!";
            }

            if (Object.keys(errorBox).length > 0) {
                return res.status(202).json({
                    "success": false,
                    "message": "Certain errors found during password reset.",
                    "error": errorBox
                });
            }
            else {
                bcryptjs.hash(newPassword, 10, (err, hash) => {
                    User.updateOne({ "email": verifyReset.email }, {
                        $set: {
                            "password": hash
                        }
                    })
                        .then((result) => {

                            return res.status(200).json({ 
                                "success": true, 
                                "message": "Login with your new password." })
                        })
                        .catch((err) => {
                            console.log(err)
                            return res.status(404).json({ "success": false, "message": err })
                        })
                })
            }
        }
        else {

            return res.status(202).json({ 
                "success": false, 
                "message": errors.array()[0].msg });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(404).json({ 
            "success": false, 
            "message": err });
    }
}


