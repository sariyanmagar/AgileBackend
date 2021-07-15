const express=require('express');
const router=express.Router();
const PlatformController=require('../controllers/platformController')

router.post('/add/platform',PlatformController.add_platform);

router.put('/update/platform/:id',PlatformController.update_platform);

router.delete('/delete/platform/:id',PlatformController.delete_platform);

router.get('/get/all/platforms',PlatformController.get_all_platforms);

router.get('/get/single/platform/:id',PlatformController.get_single_platform);

module.exports=router;