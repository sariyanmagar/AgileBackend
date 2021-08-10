const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Order=mongoose.model('Order',{
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    products:[{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }],
    buy_date:{
        type:Date,
        default:Date.now()
    },
    delivery_address:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
})

module.exports=Order;