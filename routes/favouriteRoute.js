const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');

const FavouriteController=require('../controllers/favouriteController');


router.get('/get/favourite',auth.verifyUser,FavouriteController.get_favourites);
router.post('/add/favourite',auth.verifyUser,FavouriteController.add_to_favourites);
router.delete('/delete/favourite/:id',auth.verifyUser,FavouriteController.delete_favourites);

module.exports=router;