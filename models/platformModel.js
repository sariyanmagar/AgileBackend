const mongoose=require('mongoose');

const Platform=mongoose.model('Platform',{
    platform_name:{
        type:String,
        required:true,
        
    }
})
module.exports=Platform