const express=require('express');
const router=express.Router();
const auth = require("../middleware/auth")

const PasswordResetController=require('../controllers/passwordResetController');

router.post('send/mail', PasswordResetController.Email);
router.post('reset/:userId/:token', PasswordResetController.Email);
