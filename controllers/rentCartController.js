const rentCart=require('../models/rentCartModel');
const auth=require('../middleware/auth');
const RentCart = require('../models/rentCartModel');


//............................SHOW PRODUCT IN CART..............................
exports.get=(req,res)=>{
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