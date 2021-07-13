const express=require("express");
const router=express.Router();

const ProductController=require('../controllers/productController')

router.post('/add/product',ProductController.product_insert);
module.exports=router;