const mongoose=require('mongoose');
const { array } = require('../middleware/fileUpload');
const {ObjectId}=mongoose.Schema.Types;

const Product=mongoose.model('Product',{
    productname:{
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
        type:[String]
    },
    genre:{
        type:String,
        enum:["Shooter",
        "Sandbox",
        "Real-time Strategy",
        "Multiplayer online battle area",
        "Role-Playing",
        "Simulation",
        "Sports",
        "Puzzle",
        "Action",
        "Adventure",
        "Horror",
        "Survival"],
        require:true
    },
    platform:{
        type:String,
        enum:[
            "XBox",
            "PS4",
            "PC",
            "Nintendo"],
        require:true
    },
    release_date:{
        type:Date,
    },
    added_date:{
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
        type:String
    },
})
module.exports=Product;