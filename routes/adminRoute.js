const express=require("express");
const router=express.Router();

const UserController=require('../controllers/adminController')

router.post('/admin/signup', adminController.admin_signup);

router.post('/admin/login',adminController.admin_login);

router.get('/getadmins',adminController.get_admins);

router.get('/getsingleadmin/:id',adminController.get_single_admin);

router.delete('/admindelete/:id',adminController.admin_delete);

router.put('/adminupdate/:id',adminController.admin_update);

module.exports=router;