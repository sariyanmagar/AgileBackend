const express=require('express');
const router=express.Router();
const fileUpload = require('../middleware/fileUpload')
const multipleupload=require('../middleware/multipleupload')

const ProductController=require('../controllers/productController')

router.post('/add/product',fileUpload.single("image"),ProductController.add_product);

router.put('/update/product/:id',fileUpload.single("image"),ProductController.update_product);

router.delete('/deleteproduct/:id', ProductController.delete_product);

router.get('/getallproducts', ProductController.get_all_products);

router.get('/getsingleproduct/:id',ProductController.get_single_product);

module.exports=router;