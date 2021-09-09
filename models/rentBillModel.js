const mongoose=require('mongoose');
const {modelName}=require('./productModel')

const RentBill=mongoose.model('RentBill',{
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
    advance:{
        type:Number, 
        default:1000,
    },
    quantity: {
        type : Number,
        required : false
    },
    rent_date:{
        type:Date,
        default: Date.now()
    },
    return_date:{
        type:String,
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
    status:{
        type:String,
        emun:["default","pending","returned"],
        default:"default"
    }
})

module.exports=RentBill;