const express = require('express');

const router = express.Router();
const valid = require('../middlewares/express-validation');
const { reviewPost } = require('../validation/review-validation');


const { getAllReviews, postReview, getReviewById } = require('../controllers/reviews-controller');

router.get('/reviews', getAllReviews);
router.get('/reviews/:reviewId', getReviewById);
router.post('/reviews', valid(reviewPost), postReview);

module.exports = router;
