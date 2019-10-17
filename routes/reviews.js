const express = require('express');
const router = express.Router();

const {getAllReviews} = require('../controllers/reviews.controller');

router.get('/reviews', getAllReviews);

module.exports = router;