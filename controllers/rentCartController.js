const RentCart=require('../models/rentCartModel');

//...........................SHOW PRODUCT IN BUY CART...................................................
exports.get_rentcart=(req,res)=>{
    console.log(req.user)
    RentCart.find({user:req.user._id}).populate("product").exec(function(err, rentcarts){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Cart Items",
            data:rentcarts
        })
    })
}

//..............................DELETE ..................................................................
exports.delete_rentcart=(req,res)=>{
    RentCart.findOneAndDelete({user:req.user._id, product:req.params.id}, function(err,rentcarts){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Item removed from the buy cart!!",
            data:rentcarts
        })
    })
}

//...........................ADD TO BUY CART....................................................................
exports.add_to_rentcart=(req,res)=>{
    console.log(req.user._id)
    var data={
        product:req.body.productId,
        user:req.user._id,
    }
    RentCart.findOne(data,function(err, rentcart){
        if(rentcart){
            var currentquantity=rentcart.quantity+1;
            RentCart.findOneAndUpdate({_id:rentcart._id}, {$set:{quantity:currentquantity}}).then(function(rentcart){
                return res.status(200).json({
                    success:true,
                    message:"Product added to buy cart successfully!!",
                    rentcart:rentcart
                })
            }).catch(err =>{
                return res.status(500).json({
                    success:false,
                    message:err.message
                })
            })
        }else{
            RentCart.create(data).then(function(rentcart){
                return res.status(200).json({
                    success:true,
                    message:"Product Added to Cart Successfully!!",
                    rentcart:rentcart
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