const mongoose=require('mongoose');

const Product=mongoose.model('Product',{
    productname:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        require:true
    },
    productImage:{
        type:String
    },
    category:{
        type:String,
        require:true
    },
    comment:{
        type:String
    },
    rating:{
        type:String
    }
})
module.exports=Product;