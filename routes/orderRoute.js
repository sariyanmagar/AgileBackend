const express=require('express');
const router=express.Router();
const auth = require("../middleware/auth")

const OrderController=require('../controllers/orderController');

router.get('/get/order', auth.verifyUser, OrderController.get_order);
router.post('/add/order',auth.verifyUser, OrderController.add_order);
//router.delete('/delete/buycart/:id',auth.verifyUser,BuyCartController.delete_buycart);

module.exports=router;

