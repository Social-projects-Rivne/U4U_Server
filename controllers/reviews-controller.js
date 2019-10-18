const reviewsModel = require('../models/reviews.model');
const decodeJwt = require('../middlewares/decode-token');

exports.getAllReviews = (req, res) => {
  reviewsModel.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: '404 Not found' });
    });
};

exports.postReview = (req, res) => {
  const { userJwt, comment, placeId, rating } = req.body;
  decodeJwt(userJwt)
    .then((userId) => {
      reviewsModel.create({
        comment: comment,
        placeId: placeId,
        createdBy: userId,
        rating: rating
      })
        .then(() => {
          res.status(200).send({ message: 'Its okay, we added your comment, thank you ;)' });
        })
        .catch(() => {
          res.status(500).send({ message: 'OPSS, someting goes wrong' });
        });
    });
};
