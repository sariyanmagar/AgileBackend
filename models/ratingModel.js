const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const RatingSchema = new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    productid:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    ratings:{
        type:Number,
    }
});
const Rating=mongoose.model("rating", RatingSchema);
module.exports = Rating;
