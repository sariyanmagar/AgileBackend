const mongoose=require('mongoose');
const {modelName}=require('./productModel')

const BuyCart=mongoose.model('BuyCart',{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    order:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            require:true
        },
        quantity:{
            type:Number,
            require:true,
            default:1
        },
    }],
    grandTotal:{
        type:Number
    },
    status:{
        type:String,
        emun:["default","pending","delivered"],
        default:"default"
    }
    // product:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Product',
    //     require:true
    // },
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //     require:true
    // },
    // quantity:{
    //     type:Number,
    //     require:true,
    //     default:1
    // },
})

module.exports=BuyCart;




