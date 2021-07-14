const mongoose=require('mongoose');

const User=mongoose.model('User',{
    fullname:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String,
        required:true,
        index:{
            unique:true,
        }},
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    username:{
        type:String,
        required:true,
        index:{
            unique:true,
        }
    },
    password:{
        type:String,
        required:true
    }
})
module.exports=User;