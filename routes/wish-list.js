const express = require('express');

const router = express.Router()
const {wishList} = require('../controllers/wish-list-controller');

router.get('/wishlist', wishList);

module.exports = router;