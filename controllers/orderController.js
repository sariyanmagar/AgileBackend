const Order=require('../models/orderModel');

exports.get_order=(req,res)=>{
    console.log(req.user)
    Order.find({user:req.user._id}).populate("buycart").exec(function(err, orders){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Order Items",
            data:orders
        })
    })
}

exports.add_order=(req,res)=>{
    var data={
        user:req.user._id,
        buycart:req.body.buycartId,
        address:req.body.address,
        name:req.body.name
    }
    Order.findOne(data,function(err,order){
        if(order){
            Order.findOneAndUpdate({_id:order._id}).then(function(order){
                return res.status(200).json({
                    success:true,
                    message:" Your order has been confirmed!!",
                    order:order
                })
            }).catch(err=>{
                return res.status(500).json({
                    success:false,
                    message:err.message
                })
            })
        }else{
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
    })
    
}

exports.delete_order=(req,res)=>{
    Order.findOneAndDelete({user:req.user._id, buycart:req.params.id },function(err,orders){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Order Cancelled",
            data:orders
        })
    })
}