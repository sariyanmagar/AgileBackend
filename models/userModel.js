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
    }
});
const User=mongoose.model("User", UserSchema);

const validate=(user)=>{
    const schema=Joi.object({
        username:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    })
    return schema.validate(user);
}

module.exports={User,validate};