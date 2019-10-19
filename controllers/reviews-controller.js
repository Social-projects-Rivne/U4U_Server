const reviewsModel = require('../models/reviews.model');
const tokenservice = require('../services/token-service');
const { jwtConf } = require('../config/config');
const tokenService = new tokenservice(jwtConf);

exports.getAllReviews = (req, res) => {
  reviewsModel.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: '404 Not found' });
    });
};

exports.postReview = async (req, res) => {
  try {
    const { userJwt, comment, placeId, rating } = req.body;

    const userId = await tokenService.tokenDecode(userJwt);

    await reviewsModel.create({
      comment: comment,
      placeId: placeId,
      createdBy: userId,
      rating: rating
    });

    await res.status(200).send({message: 'Thanks, we added your comment'});
  }
  catch (e) {
    res.status(500).send({message: e});
  }  
};
