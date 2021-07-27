const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth')


const RentBillController=require('../controllers/rentBillController');

router.get('/get/rentbill',auth.verifyUser,rentBillController.get_rentbill);
router.post('/add/rentbill', auth.verifyUser,rentBillController.add_to_rentbill);
router.delete('/delete/rentbill/:id',auth.verifyUser,rentBillController.delete_rentbill);


module.exports=router;