const mongoose=require('mongoose');
const {modelName}=require('./productModel')

const RentBill=mongoose.model('RentBill',{
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        require:true
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    advance:{
        type:Number, 
        default:200,
    },
    rent_date:{
        type:Date,
        default: Date.now()
    },
    return_date:{
        type:Date,
    },
    days_rented:{
        type:Number,
    },
    total_price:{
        type:Number,
    },
    due_remaining:{
        type:Number,
    },
    returned:{
        type:Boolean,
        default:false
    }
})

module.exports=RentBill;