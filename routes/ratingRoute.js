const express = require("express");
const router = express.Router();

const RatingController = require('../controllers/ratingController')

router.post('/user/rating', RatingController.add_rating);
router.get('/getRating/:product_id', RatingController.getRatingByID);

module.exports = router