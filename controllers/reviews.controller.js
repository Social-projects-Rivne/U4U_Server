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
    // must decode id of user  --- create middlevare
    // then i must know id of place --- hardcode this is now
    // what with update at ? --- set in on put
    // and middleware validation --- created
    console.log(req.body);
}