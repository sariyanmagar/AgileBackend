const mongoose=require('mongoose');

const Promocode=mongoose.model('Promocode',{
    code:{
        type:String,
        index:{
            unique:true,
        }
    },
    percent:{
        type:Number,
    },
    active:{
        type:String,
        enum:["Yes","No"]
    }
})
module.exports=Promocode;
