//third party module
const mongoose=require('mongoose');
const express=require('express');
const webpush=require('web-push')
const bodyParser=require('body-parser');//core module
const cors = require('cors')

const publicVapidKey='BLaccjgm75Ojtapy-pPj1BV467St1DzqKTjBeDk2aWyYUAprMSfcKsXMSzgLrzdrxVnCmdxHaaiCmGyyO3ljPWY';
const privateVapidKey='GTmf0ucpf3Kc0f2cSh4KvxsxWpEJyNtYduhuRxkO6sc';

webpush.setVapidDetails('mailto:sariyanmagar@gmail.com',publicVapidKey,privateVapidKey);

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
const commentRoute=require('./routes/commentRoute');

const path=require('path')
const publicDir=path.join(__dirname+ "public")
const app=express();


webpush.setVapidDetails('mailto:sariyanmagar@gmail.com', publicVapidKey, privateVapidKey)
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
app.use(commentRoute);
app.use("/public", express.static(__dirname+ "/public"));

//subscribe route
app.post('/subscribe', (req, res)=>{
  //get push subscription object from the request
  const subscription = req.body;

  //send status 201 for the request
  res.status(201).json({})

  //create paylod: specified the detals of the push notification
  const payload = JSON.stringify({title: 'Section.io Push Notification' });

  //pass the object into sendNotification fucntion and catch any error
  webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
})


app.get('/', (req, res) => {
    res.send('GOGO Gaming')
  })

//app.listen(90);
app.listen(process.env.PORT, () => {
    console.log("App listening at http://localhost:90")
});