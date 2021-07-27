const Order=require('../models/orderModel');

//...................GET ORDER...............................
exports.get_order=(req,res)=>{
    Order.find({user:req.user._id}).populate("product").exec(function(err, order){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Order items",
            data:order
        })
    })
}
