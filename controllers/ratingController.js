const Rating = require("../models/ratingModel")
exports.add_rating = (req, res) => {
    const rating = req.body.rating;
    const product_id = req.body.product_id;
    const ratingData = new Rating({
        rating: rating,
        product_id: product_id
    })
    ratingData.save()
        .then(function (success) {
            res.status(200).json({ success: true, message: "rating Added Successfully!!" })
        })
        .catch(function (err) {
            res.status(500).json({ error: err })
        })
}
exports.getRatingByID = (req, res) => {
    const product_id = req.params.product_id;
    Rating.find({ product_id: product_id })
        .then(function (ratingData) {
            res.status(200).json({ ratingData, success: true })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
}
