const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ReplySchema = new Schema({

    userid : {type: Schema.Types.ObjectId, ref: 'User'},
    commentid :  {type: Schema.Types.ObjectId, ref: 'comment'},
    productid :  {type: Schema.Types.ObjectId, ref: 'Product'},
    reply : {
        type :String
    }
    
});

const Reply = mongoose.model('reply', ReplySchema);

module.exports = Reply;