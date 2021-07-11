const mongoose=require('mongoose');

const Admin=mongoose.model('Admin',{
    admin_name:{
        type:String
    },
    admin_password:{
        type:String
    },
});
module.exports=Admin;