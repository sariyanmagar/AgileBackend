const mongoose=require('mongoose');

const UserRegister=mongoose.model('UserRegister',{
    fullname:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

})
module.exports=UserRegister;