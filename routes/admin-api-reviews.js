const express = require('express');
const router = express.Router();

const { getAllReviews } = require('../controllers/admin-reviews-controller');

router.get('/reviews', getAllReviews);

module.exports = router;
