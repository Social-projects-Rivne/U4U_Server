const express = require('express');
const router = express.Router();

const {getAllReviews, postReview} = require('../controllers/reviews.controller');

router.get('/reviews', getAllReviews);
router.post('/reviews', postReview);

module.exports = router;