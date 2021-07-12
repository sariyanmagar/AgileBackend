const express=require("express");
const router=express.Router();

const AdminController=require('../controllers/adminController')

router.post('/admin/signup', AdminController.admin_signup);

router.post('/admin/login',AdminController.admin_login);

router.get('/get/admins',AdminController.get_admins);

router.get('/getadmin/:id',AdminController.get_single_admin);

router.delete('/admindelete/:id',AdminController.admin_delete);

router.put('/adminupdate/:id',AdminController.admin_update);

module.exports=router;