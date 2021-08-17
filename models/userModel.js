const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Joi=require("joi");

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
    resetLink:{
        data:String,
        default:''
    }

});
const User=mongoose.model("User", UserSchema);

module.exports=User;