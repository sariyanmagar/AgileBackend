const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    fullname:{
        type:String
    },
    gender:{
        type:String
    },
    age:{
        type:Number
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
    profile:{
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
    },
});
const User=mongoose.model("User", UserSchema);

module.exports=User;