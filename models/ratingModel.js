const mongoose = require('mongoose');

const Rating = mongoose.model('Rating', {
    rating: {
        type: Number,

    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
})
module.exports = Rating;
