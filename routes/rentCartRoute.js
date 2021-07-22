const express=require('express');
const router=express.Router();


const RentCartController=require('../controllers/rentCartController');

router.get('/get/rentcart',RentCartController.get_cart);
router.post('/add/rentcart', RentCartController.add_to_rentCart);
router.delete('/delete/rentcart',RentCartController.delete_from_cart);


module.exports=router;