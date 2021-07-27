const mongoose=require('mongoose');
const {modelName}=require('./productModel')

const RentCart=mongoose.model('RentCart',{
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
    quantity:{
        type:Number,
        require:true,
        default:1
    }
})
module.exports=RentCart;