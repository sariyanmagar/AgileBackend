const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth')


const RentCartController=require('../controllers/rentCartController');

router.get('/get/rentcart',auth.verifyUser,RentCartController.get_rentcart);
router.post('/add/rentcart', auth.verifyUser,RentCartController.add_to_rentcart);
router.delete('/delete/rentcart',auth.verifyUser,RentCartController.delete_rentcart);


module.exports=router;