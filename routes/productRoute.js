const express=require('express');
const router=express.Router();
const fileUpload = require('../middleware/fileUpload')
const multipleUpload = require('../middleware/multipleupload')
const auth=require('../middleware/auth');
const ProductController=require('../controllers/productController')

router.post('/add/product',fileUpload.single("image"),multipleUpload,ProductController.add_product);

router.put('/update/product/:id',fileUpload.single("image"),ProductController.update_product);

router.delete('/deleteproduct/:id', ProductController.delete_product);

router.get('/getallproducts/:sortType', ProductController.get_all_products);

router.get('/getsingleproduct/:id',ProductController.get_single_product);

router.get('/get/genre/:category', ProductController.get_genre);

router.get('/get/platform/:category', ProductController.get_platform);

router.post('/getAvgRating',ProductController.getAvgRating);

router.post('/rate/product',auth.verifyUser,ProductController.rateProducts);

router.get('/getfourproducts/:id', ProductController.get_four_products);

module.exports=router;