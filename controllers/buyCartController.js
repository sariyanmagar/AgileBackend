const auth=require('../middleware/auth');
const BuyCart=require('../models/buyCartModel');

exports.get_buycart=(req,res)=>{
    BuyCart.find({user:req.user._id}).populate("product").exec(function(err, buycarts){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Cart Items",
            data:buycarts
        })
    })
}

exports.delete_buycart=(req,res)=>{
    BuyCart.findOneAndDelete({user:req.user._id, product:req.params.id}, function(err,carts){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Item removed from the buy cart!!",
            data:buycarts
        })
    })
}

exports.add_to_buycart=(req,res)=>{
    var data={
        product:req.body.productId,
        user:req.user._id,
    }
    BuyCart.findOne({user:req.user._id, product:req.body.productId},function(err, buycart){
        if(buycart){
            var currentquantity=buycart.quantity+1;
            BuyCart.findOneAndUpdate({_id:buycart._id}, {$set:{quantity:currentquantity}}).then(function(buycart){
                return res.status(200).json({
                    success:true,
                    message:"Product added to buy cart successfully!!",
                    buycart:buycart
                })
            }).catch(err =>{
                return res.status(500).json({
                    success:false,
                    message:err.message
                })
            })
        }else{
            BuyCart.create(data).then(function(buycart){
                return res.status(200).json({
                    success:true,
                    message:"Product Added to Cart Successfully!!",
                    buycart:buycart
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