//third party module
const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');//core module
const cors = require('cors')

const db=require('./database/db');
const userRoute=require('./routes/userRoute');
const adminRoute=require('./routes/adminRoute');


const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(userRoute);
app.use(adminRoute);



app.listen(90);