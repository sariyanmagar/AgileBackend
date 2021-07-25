const express=require('express');
const router=express.Router();
const auth = require("../middleware/auth")

const BuyCartController=require('../controllers/buyCartController');

router.get('/get/buycart', auth.verifyUser, BuyCartController.get_buycart);
router.post('/add/buycart',auth.verifyUser, BuyCartController.add_to_buycart);
router.delete('/delete/buycart/:id',auth.verifyUser,BuyCartController.delete_buycart);

module.exports=router;

