const mongoose=require('mongoose');

const Favourite=mongoose.model('Favourite',{
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref='Product',
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref='User',
        require:true
    }
})
module.exports=Favourite;