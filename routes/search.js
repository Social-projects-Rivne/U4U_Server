const express = require('express');
const router = express.Router();

const { getSearchData, getSearchStar } = require('../controllers/search-controller');

router.get('/search', getSearchData);
router.get('/search/stars', getSearchStar);

module.exports = router;
