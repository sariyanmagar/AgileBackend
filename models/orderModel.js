const mongoose=require('mongoose');

const Order=mongoose.model('Order',{
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    order_date:{
        type:Date
    },
    quantity:{
        type:Number
    },
    total:{
        type:Number
    }
})
module.exports=Order;