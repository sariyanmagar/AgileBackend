const express=require('express');
const router=express.Router();
const PublisherController=require('../controllers/publisherController')

router.post('/add/publisher',PublisherController.add_publisher);

router.put('/update/publisher/:id',PublisherController.update_publisher);

router.delete('/delete/publisher/:id',PublisherController.delete_publisher);

router.get('/get/all/publishers',PublisherController.get_all_publishers);

router.get('/get/single/publisher/:id',PublisherController.get_single_publisher);

module.exports=router;