//third party module
const mongoose=require('mongoose');
const express=require('express');
const cors = require('cors')

const db=require('./database/db');
const userRoute=require('./routes/userRoute');


const app=express();
app.use(cors())
app.use(express.json());
app.use(userRoute);


app.listen(90);