const mongoose=require('mongoose');

const Product=mongoose.model('Product',{
    productname:{
        type:String,
        
    },
    platform:{
        type:String,

    },
    rent_price:{
        type:Number,  
    },

    buy_price:{
        type:Number,  
    },

    publisher:{
        type:String
    },
    image:{
        type:String
    },
    screenshots:{
        type:String
    },
    genre:{
        type:String,
        enum:["Shooter",
        "Sandbox",
        "Real-time Strategy",
        "Multiplayer online battle area",
        "Role-playing",
        "Simulation",
        "Sports",
        "Puzzle",
        "Action-Adventure",
        "Horror/Survival"],
        require:true
    },
    release_date:{
        type:Date,
    },
    added_Date:{
        type:Date,
    },
    condition:{
        type:String,
        enum:["New", "Preowned"]
    },
    system_requirements:{
        type:String,
    },
    instock:{
        type:String,
        enum:["Yes","No"],
        default:'Yes',
    },
    description:{
        type:String,
        require:true
    },
    trailer:{
        type:String,
    }
})
module.exports=Product;