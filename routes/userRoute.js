const express=require("express");
const router=express.Router();
const fileUpload=require('../middleware/fileUpload')
const { check } = require('express-validator');
const UserController=require('../controllers/userController')
const auth=require('../middleware/auth');

router.post('/signup',fileUpload.single("profile"), UserController.user_signup);

router.post('/login',UserController.user_login);

router.get('/getallusers',UserController.get_all_users);

router.get('/getsingleuser/:id',UserController.get_single_user);

router.delete('/userdelete/:id',UserController.user_delete);

router.put('/userupdate/:id',UserController.user_update);

router.post('/getRatingsByUser',auth.verifyUser,UserController.getRatings );

router.get('/getRatings', UserController.getRatings);

router.post('/change/password', UserController.change_password);

router.post('/forgot/password', UserController.verifyEmail);

router.post('/reset/Password',
[
    check('newPassword','Please provide your new password.').not().isEmpty(),
    check('confirmPassword',"Re-Enter your pasword.").not().isEmpty(),
    check('newPassword','Password should lie under the range of 8-13').isLength({"min":8,"max":13})
],UserController.resetPassword)
module.exports=router;