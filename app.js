//third party module
const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');//core module
const cors = require('cors')

const db=require('./database/db');
const userRoute=require('./routes/userRoute');
const adminRoute=require('./routes/adminRoute');
const productRoute=require('./routes/productRoute');
const platformRoute=require('./routes/platformRoute');
const publisherRoute=require('./routes/publisherRoute');
const path=require('path')


const publicDir=path.join(__dirname+ "public")



const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(userRoute);
app.use(adminRoute);
app.use(productRoute);
app.use(platformRoute);
app.use(publisherRoute);
app.use("/public", express.static(__dirname+ "/public"));


app.get('/', (req, res) => {
    res.send('GOGO Gaming')
  })

//app.listen(90);
app.listen(process.env.PORT, () => {
    console.log("App listening at http://localhost:90")
});