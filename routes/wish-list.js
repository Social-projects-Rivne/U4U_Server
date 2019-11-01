const express = require('express');
const router = express.Router()

const {wishListGet, wishListPost, wishListDelete, markItemAsDone, markItemAsImportant} = require('../controllers/wish-list-controller');

router.get('/wishlist', wishListGet);
router.post('/wishlist', wishListPost);
router.delete('/wishlist', wishListDelete);
router.put('/wishlist', markItemAsDone);
router.put('/wishlist', markItemAsImportant);


module.exports = router;