const express = require('express');

const router = express.Router()
const {wishListGet} = require('../controllers/wish-list-controller');

router.get('/wishlist', wishListGet);

module.exports = router;