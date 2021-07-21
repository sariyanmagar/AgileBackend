const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');


const RentCartController=require('../controllers/rentCartController');

router.get('/get/rentcart',auth.verifyUser,RentCartController.get_cart);
router.post('/add/to/rentcart', auth.verifyUser,RentCartController.add_to_rentCart);
router.delete('/delete/rentcart',auth.verifyUser, RentCartController.delete_from_cart);


module.exports=router;