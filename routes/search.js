const express = require('express');
const router = express.Router();

const { getSearchData, getSearchStar, getRandomPlace } = require('../controllers/search-controller');

router.get('/search', getSearchData);
router.get('/search/stars', getSearchStar);
router.get('/search/random', getRandomPlace);

module.exports = router;
