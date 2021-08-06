//third party module
const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');//core module
const cors = require('cors')


const db=require('./database/db');
const userRoute=require('./routes/userRoute');
const adminRoute=require('./routes/adminRoute');
const productRoute=require('./routes/productRoute');
const rentCartRoute=require('./routes/rentCartRoute');
const buyCartRoute=require('./routes/buyCartRoute');
const favouriteRoute=require('./routes/favouriteRoute');
const promocodeRoute=require('./routes/promocodeRoute');
const orderRoute=require('./routes/orderRoute');
const rentBillRoute=require('./routes/rentBillRoute');

const faqRoute=require('./routes/faqRoute');
const ratingRoute=require('./routes/ratingRoute');


const path=require('path')
const publicDir=path.join(__dirname+ "public")
const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(userRoute);
app.use(adminRoute);
app.use(productRoute);
app.use(rentCartRoute);
app.use(buyCartRoute);
app.use(favouriteRoute);
app.use(promocodeRoute);
app.use(orderRoute);
app.use(rentBillRoute);
app.use(faqRoute);
app.use(ratingRoute);
app.use("/public", express.static(__dirname+ "/public"));


// app.get('/', (req, res) => {
//     res.send('GOGO Gaming')
//   })

app.listen(90);
// app.listen(process.env.PORT, () => {
//     console.log("App listening at http://localhost:90")
// });