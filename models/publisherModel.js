const mongoose=require('mongoose');

const Publisher=mongoose.model('Publisher',{
    publisher_name:{
        type:String,
        required:true,  
    }
})
module.exports=Publisher;