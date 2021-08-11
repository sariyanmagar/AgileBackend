const Order=require('../models/orderModel');
const Product = require('../models/productModel');

//...........................GET ORDER......................................................................
exports.get_order=(req,res)=>{
    console.log(req.user)
    Order.find({user:req.user._id}).populate("products").exec(function(err, order){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Order Items",
            data:order
        })
    })
}

//................................ADD ORDER.................................................................
exports.add_order= async (req,res)=>{
   
    var data={
        user:req.user._id,
        products:req.body.products,
        buy_date:req.body.buy_date,
        delivery_address:req.body.delivery_address,
        name:req.body.name
    }
     Order.create(data).then(function(order){
         return res.status(200).json({
             success:true,
             message:" Your order has been confirmed!!",
             order:order
            })
        }).catch(err =>{
            return res.status(500).json({
                success:false,
                message:err.message
                })
            })
        } 

//............................................DELETE ORDER...............................................
exports.delete_order=(req,res)=>{
    Order.findOneAndDelete({user:req.user._id, product:req.params.id },function(err,order){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Your order has been successfully cancelled!!",
            data:order
        })
    })
}