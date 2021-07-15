const express=require("express");
const router=express.Router();

const UserController=require('../controllers/userController')

router.post('/signup', UserController.user_signup);

router.post('/login',UserController.user_login);

router.get('/getallusers',UserController.get_all_users);

router.get('/getsingleuser/:id',UserController.get_single_user);

router.delete('/userdelete/:id',UserController.user_delete);

router.put('/userupdate/:id',UserController.user_update);

module.exports=router;