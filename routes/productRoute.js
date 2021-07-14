const express=require('express');
const router=express.Router();
const fileUpload = require('../middleware/fileUpload')
const ProductController=require('../controllers/productController')

router.post('/add/product',fileUpload.single('image'),ProductController.add_product);

router.put('/update/product/:id',ProductController.update_product)
module.exports=router;