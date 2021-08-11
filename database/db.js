const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://SafallShakya:gogogaming@cluster0.qjkfl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology : true
})