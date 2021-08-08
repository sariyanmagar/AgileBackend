const Rating = require("../models/ratingModel")
const mongoose=require('mongoose');

exports.add_rating = (req, res) => {
    Rating.findOne({user:req.user._id, product:req.body.product}, function(err,review){
       if (err) res.status(500).send(err);
       
       if(!review){
           Rating.create({
               user:req.user._id,
               product:req.body.product,
               ratings:req.body.ratings,
               review:req.body.review
           }, function(err,ratings){
               if(err) return res.status(500).send(err);

               return res.json({
                   success:true,
                   message:"Rating Successfully Added!!",
               })
           })
       }else{
           var updatedata={
               ratings:req.body.ratings,
               review:req.body.review
           };

           Rating.findByIdAndUpdate(review._id, updatedata,function(err, review){
               if (err) res.status(500).send(err);

               Rating.findById(review._id, function (err, reviewdata){

                return res.json({
                    success:true,
                    message:"Ratings Updated"
                });
               })
           })
       }
    })
}

exports.getRatings=(req,res)=>{
    Rating.find({product:req.params.product}).populate("User").exec(function(err,review){
        if(err) return res.status(500).send(err);
        return res.json({
            success:true,
            message:"Ratings",
            reviews:review
        })
    })
}

exports.getRatingsByUser=(req,res)=>{
    Rating.findOne({product : req.params.product, user : req.userdata._id}).populate("user").exec(function(err, review){
        if(err) return res.status(500).send(err);

        return res.json({
            success: true,
            message:  "Ratings",
            userReview : review
        });
    })
}

exports.getRatingsByLimit=(req,res)=>{
    Rating.find({product : req.params.product}).limit(2).populate("user").exec(function(err, review){
        if(err) return res.status(500).send(err);

        return res.json({
            success: true,
            message:  "Ratings",
            reviews : review
        });
    });
}

exports.ratingsCount=(req,res)=>{
    Rating.aggregate([
        {
            $match : {product : {$in:[mongoose.Types.ObjectId(req.params.product)]}}
        },
        {
            $group : {
                _id : '$ratings',
                count: { $sum: 1 },
             
            }
        },
        { $sort : { "_id": -1 } },
        {
            $project:{
              rating:"$_id",
              count : "$count",
             _id:false
            } 
        }
    ], function(err, data){
        if(err) return res.status(500).send(err);

        return res.status(200).json({
            success : true,
            message : "Ratings Breakdown",
            ratingsBreakdown : data
        })
    })
}

