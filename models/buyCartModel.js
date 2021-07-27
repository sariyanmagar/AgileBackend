const mongoose=require('mongoose');
const {modelName}=require('./productModel')

const BuyCart=mongoose.model('BuyCart',{
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

module.exports=BuyCart;