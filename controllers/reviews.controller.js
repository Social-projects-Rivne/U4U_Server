const reviewsModel = require('../models/reviews.model');

exports.getAllReviews = (req, res) => {
    reviewsModel.find({})
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(404).send({message: "404 Not found"});
    })
};
exports.postReview = (req, res) => {
    console.log(req.body);
}