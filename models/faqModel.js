const mongoose=require('mongoose');

const Faq=mongoose.model('Faq',{
    question:{
        type:String
    },
    answer:{
        type:String
    },
    answered:{
        type:Boolean
    }
})
module.exports=Faq;