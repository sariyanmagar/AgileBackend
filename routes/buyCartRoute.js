const express=require('express');
const router=express.Router();
const auth = require("../middleware/auth")

const BuyCartController=require('../controllers/buyCartController');

router.get('/get/buycart', auth.verifyUser, BuyCartController.get_buycart);
router.get('/get/trending', BuyCartController.get_trending);
router.get('/get/default_buycart', auth.verifyUser, BuyCartController.get_default_buycart);
router.post('/add/buycart',auth.verifyUser, BuyCartController.add_to_buycart);
router.put('/update/default_to_pending',auth.verifyUser, BuyCartController.update_buycart_to_pending);
router.put('/update/pending_to_delivered',auth.verifyUser, BuyCartController.update_buycart_to_delivered);
router.delete('/delete/buycart/:id',auth.verifyUser,BuyCartController.delete_buycart);

module.exports=router;

