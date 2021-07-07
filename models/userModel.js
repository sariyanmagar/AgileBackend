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
    role:{
        type:String,
        enum:["Admin","Customer"],
        default:"Customer"
    }

})
module.exports=User;