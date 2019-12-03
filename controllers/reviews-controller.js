const reviewsModel = require('../models/reviews.model');
const tokenservice = require('../services/token-service');
const placeModel = require('../models/places.model');
const { jwtConf } = require('../config/config');
const sequelize = require('../config/postgre');
const tokenService = new tokenservice(jwtConf);

exports.getAllReviews = (req, res) => {
  reviewsModel
    .find({})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: '404 Not found' });
    });
};

exports.postReview = async (req, res) => {
  try {
    const { placeId, comment, rating, userJwt } = req.body;
    const place = await placeModel.places.findOne({ _id: placeId });
    if (!place) {
      throw 'Sorry invalid id of place, try later';
    }

    const userId = await tokenService.verify(userJwt);

    const mongooseResponse = await reviewsModel.create({
      comment: comment,
      placeId: placeId,
      createdBy: userId,
      rating: rating
    });
    const userData = await sequelize.query(
      `SELECT email as "userEmail", nickname as "userNickname", avatar as "userAvatar" FROM users WHERE id=${userId}`
    );
    const newCommentInfo = { ...mongooseResponse._doc, ...userData[0][0] }

    reviewsModel
      .aggregate([
        {
          $group: {
            _id: '$placeId',
            stars: { $avg: '$rating' },
          },
        },
        {
          $project: {
            star: { $divide: [{ $trunc: { $multiply: ["$stars", 10] } }, 10] }
          }
        },
      ])
      .match({ _id: placeId })
      .then((data) => {
        const { _id: plsId, star } = data[0]
        placeModel.places.updateOne(
          { _id: plsId },
          { $set: { ratingAvg: star } })
          .then((data) => {
            res.status(200);
          })
      })
      .catch(err => { console.log(err) })

    await res.status(200).send({
      message: 'Thanks, we added your comment',
      data: newCommentInfo
    });
  }
  catch (e) {
    res.status(500).send({ message: 'Wrong id of place or invalid JWT' });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const reviewById = await reviewsModel.find({ placeId: reviewId });

    if (!reviewById.length) {
      res.status(200).send(reviewById);
    }

    const usersId = reviewById.map((item) => {
      return item.createdBy;
    })
    const UserEmails = await sequelize.query('SELECT id, email, nickname, avatar FROM users WHERE id IN ' + '(' + usersId + ')');
    const result = [];

    reviewById.map((reviewElem) => {
      UserEmails[0].find((userElem) => {
        if (reviewElem.createdBy === userElem.id) {
          result.push({ ...reviewElem._doc, userEmail: userElem.email, userAvatar: userElem.avatar, userNickname: userElem.nickname });
        }
      })
    })
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ message: 'Not found' });
  }
};
