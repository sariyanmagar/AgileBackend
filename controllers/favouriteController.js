const Favourite=require('../models/favouritesModel');


//............................GET FAVOURITE PRODUCT......................
exports.get_favourites=(req,res)=>{
    Favourite.find({user:req.user._id}).populate("product").exec(function(err,favourite){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Favourite Items",
            data:favourite
        })
    })
}

//................................DELETE FAVOURITE PRODUCT................................
exports.delete_favourites=(req,res)=>{
    Favourite.findOneAndDelete({user:req.user._id, product:req.params.id},function(err,favourite){
        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Item removed from the favourite!!",
            data:favourite
        })
    })
}

//............................ADD TO FAVOURITES................................
exports.add_to_favourite=(req,res)=>{
    var data={
        product:req.body.productId,
        user:req.user._id,
    }
    Favourite.findOne({user:req.user._id, product:req.body.productId},function(err, favourite){
        if(favourite){
            Favourite.findOneAndUpdate({_id : favourite._id}).then(function(favourite){
                return res.status(200).json({
                    success : true,
                    message : "Item Added to favourite Successfully!!",
                    favourite : favourite
                })
            }).catch(err => {
                return res.status(500).json({
                    succeess : false,
                    messsage : err.message
                })
            })
        }else{
            Favourite.create(data).then(function(favourite){
                return res.status(200).json({
                    success : true,
                    message : "Item Added to favourite Successfully!!",
                    favourite : favourite
                })
            }).catch(err => {
                return res.status(500).json({
                    succeess : false,
                    messsage : err.message
                })
            })
        }
    })
}
