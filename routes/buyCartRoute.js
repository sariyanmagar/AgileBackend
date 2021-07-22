const express=require('express');
const router=express.Router();

const BuyCartController=require('../controllers/buyCartController');

router.get('/get/buycart',BuyCartController.get_buycart);
router.post('/add/buycart',BuyCartController.add_to_buycart);
router.delete('/delete/buycart',BuyCartController.delete_buycart);

module.exports=router;

