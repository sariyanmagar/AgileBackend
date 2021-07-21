const rentCart=require('../models/rentCartModel');
const auth=require('../middleware/auth');
const RentCart = require('../models/rentCartModel');


//............................SHOW PRODUCT IN CART.................................................................
exports.get_cart=(req,res)=>{
    RentCart.find({user:req.user._id}).populate("product").exec(function(err,rentCarts){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Cart Items",
            data:rentCarts
        })
    })
}

//.............................ADD PRODUCT TO CART....................................................................
exports.add_to_rentCart=(req,res)=>{
    var data={
        product:req.body.productId,
        user:req.user._id,
    }

    RentCart.findOne({user:req.user._id, product:req.body.productId}), function(err,rentCart){
        if(rentCart){
            var quantity=rentCart.quantity+1;
            RentCart.findOneAndUpdate({_id:rentCart._id},{$set:{quantity:quantity}})
            .then(function(rentCart){
                return res.status(200).json({
                    success:true,
                    message:"Product Added to Rent Cart Successfully!!",
                    rentCart:rentCart
                })
            }).catch(err=>{
                return res.status(500).json({
                    success:false,
                    message:err.message
                })
            })
        }else{
            RentCart.create(data).then(function(rentCart){
                return res.status(200).json({
                    success:true,
                    message:"Product Added to Rent Cart Successfully!!",
                    rentCart:rentCart
                })
            }).catch(err=>{
                return res.status(500).json({
                    success:false,
                    message:err.message
                })
            })
        }
    }
}

//...................................DELETE FROM RENT CART.........................................................
exports.delete_from_cart=(req,res)=>{
    rentCart.findOneAndDelete({user:req.user._id,product:req.params.id},function(err,rentCarts){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Item removed from the cart!!",
            data:rentCarts
        })
    })
}
