const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CommentSchema=new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    productid:{
        type:Schema.Types.ObjectId,
        ref:'Product',
    },
    comment:{
        type:String,
    },
    replies:[{
        id : {type: Schema.Types.ObjectId, ref: 'reply'}

    }]
});
const Comment=mongoose.model('comment', CommentSchema);
module.exports=Comment;