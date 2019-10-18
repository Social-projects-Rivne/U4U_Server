const express = require('express');
const router = express.Router();
const valid = require('../middlewares/express-validation');
const { reviewPost } = require('../validation/review-validation');


const {getAllReviews, postReview} = require('../controllers/reviews.controller');

router.get('/reviews', getAllReviews);
router.post('/reviews', valid(reviewPost) ,postReview);

module.exports = router;