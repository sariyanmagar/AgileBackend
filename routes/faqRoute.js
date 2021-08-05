const express=require('express');
const router=express.Router();

const FaqController=require('../controllers/faqController')

router.post('/add/faq',FaqController.add_faq);

router.post('/add/admin/faq',FaqController.add_admin_faq);

router.put('/update/faq/:id',FaqController.update_faq);

router.delete('/deletefaq/:id', FaqController.delete_faq);

router.get('/getallfaq', FaqController.get_all_faqs);

router.get('/getsinglefaq/:id',FaqController.get_single_faq);

router.post('/getunanswered/:answered',FaqController.get_unanswered);

module.exports=router;