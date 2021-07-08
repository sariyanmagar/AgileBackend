const express=require("express");
const router=express.Router();

const UserController=require('../controllers/userController')

router.post('/signup', UserController.user_signup);

router.post('/login',UserController.user_login);

router.get('/getusers',UserController.get_user);

router.get('/getsingleuser',UserController.get_single_user);

router.delete('/userdelete',UserController.user_delete);

router.put('/userupdate',UserController.user_update);

module.exports=router;