const express=require('express');
const router=require('Router');

const FavouriteController=require('../controllers/favouriteController');

router.get('/get/favourite',FavouriteController.get_favourites);
router.post('/add/favourite',FavouriteController.add_to_favourites);
router.delete('/delete/favourite',FavouriteController.delete_favourites);

module.exports=router;