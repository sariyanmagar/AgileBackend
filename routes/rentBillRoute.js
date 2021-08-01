const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth')


const RentBillController=require('../controllers/rentBillController');

router.get('/get/rentbill',auth.verifyUser,RentBillController.get_rentbill);
router.post('/add/rentbill', auth.verifyUser,RentBillController.add_to_rentbill);
router.delete('/delete/rentbill/:id',auth.verifyUser,RentBillController.delete_rentbill);
router.put('/update/rentbill/:id',auth.verifyUser,RentBillController.update_rentbill);


module.exports=router;