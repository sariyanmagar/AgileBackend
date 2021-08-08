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

