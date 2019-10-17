const {Schema, model} = require('mongoose');

const reviewsModel = new Schema({
    comment: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    placeId: {
        type: String,
        required: true
    },
    createdBy: {
        type: Number,
        required: true
    },
});

module.exports = model('reviews', reviewsModel);