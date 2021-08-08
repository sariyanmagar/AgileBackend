const express = require("express");
const router = express.Router();
const auth=require('../middleware/auth')

const RatingController = require('../controllers/ratingController')

router.post('/add/rating', RatingController.add_rating);
router.get('/getRating/:product', RatingController.getRatings);
router.get('/ratings/limit/:product', RatingController.getRatingsByLimit);
router.get('/ratings/user/:product',auth.verifyUser, RatingController.getRatingsByUser);
router.get('rating/count/:product',RatingController.ratingsCount);

module.exports = router;