const reviewsModel = require('../models/reviews.model');
const tokenservice = require('../services/token-service');
const placeModel = require('../models/places.model');
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
    const { placeId, comment, rating, userJwt } = req.body;
    const place = await placeModel.findOne({ _id: placeId });
    if(!place){
      throw 'Sorry invalid id of place, try later';
    }

    const userId = await tokenService.verify(userJwt);

    await reviewsModel.create({
      comment: comment,
      placeId: placeId,
      createdBy: userId,
      rating: rating
    });

    await res.status(200).send({message: 'Thanks, we added your comment'});
  }
  catch (e) {
    res.status(500).send({message: 'Wrong id of place or invalid JWT'});
  }  
};
