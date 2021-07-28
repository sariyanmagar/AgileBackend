const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;

const Order=mongoose.model('Order',{
    allProduct:[
        {
            id:{
                type:ObjectId,
                ref:'Product'},
                quantity:Number,
        },
    ],
    user:{
        type:ObjectId,
        ref:'User',
        required:true
    },
    order_date:{
        type:Date
    },
    total:{
        type:Number
    },
    status:{
        type:String,
        default:"Not processed",
        enum:[
            "Not processed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ]
    },
})

module.exports=Order;