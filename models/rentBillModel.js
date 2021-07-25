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
        default:200,
    },
    rent_date:{
        type:Date,
    },
    days_rented:{
        type:Number,
    },
    calc_price:{
        type:Number,
    },
    total_price:{
        type:Number,
    }
})

module.exports=RentBill;