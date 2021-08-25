const express=require('express');
const router=express.Router();
const auth = require("../middleware/auth")

const BuyCartController=require('../controllers/buyCartController');

router.get('/get/buycart', auth.verifyUser, BuyCartController.get_buycart);
router.get('/get/trending', BuyCartController.get_trending);
router.get('/get/default_buycart', auth.verifyUser, BuyCartController.get_default_buycart);
router.get('/get/order', auth.verifyUser, BuyCartController.get_pending_delivered_buycart);
router.get('/get/admin/order', auth.verifyUser, BuyCartController.get_order_admin);
router.post('/add/buycart',auth.verifyUser, BuyCartController.add_to_buycart);
router.put('/update/default_to_pending',auth.verifyUser, BuyCartController.update_buycart_to_pending);
router.put('/update/pending_to_delivered',auth.verifyUser, BuyCartController.update_buycart_to_delivered);
//router.delete('/delete/buycart/:id',auth.verifyUser,BuyCartController.delete_buycart);
router.put('/delete/buycart/:id/:Ob_id',auth.verifyUser,BuyCartController.remove_buycart);
router.put('/delete/order/:id/:Ob_id',auth.verifyUser,BuyCartController.remove_order);

module.exports=router;

