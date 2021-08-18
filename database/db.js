const mongoose=require('mongoose');

// mongoose.connect('mongodb+srv://SafallShakya:gogogaming@cluster0.qjkfl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology : true
// })
mongoose.connect('mongodb://127.0.0.1:27017/GameRental',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology : true
})