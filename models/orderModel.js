const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Order=mongoose.model('Order',{
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    buycart:{
        type:Object,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }
})

module.exports=Order;