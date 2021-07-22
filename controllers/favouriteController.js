const Favourite=require('../models/favouritesModel');

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