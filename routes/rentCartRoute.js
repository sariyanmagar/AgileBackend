const express=require('express');
const router=express.Router();

const RentCartController=require('../controllers/rentCartController');

router.get('/get/rentcart', RentCartController.add_to_rentCart);

router.post('/add/to/rentcart', RentCartController.add_to_rentCart);


module.exports=router;