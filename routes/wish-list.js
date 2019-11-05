const express = require('express');
const router = express.Router()
const { wishListGet,
       wishListPost, 
       wishListDelete, 
       markItemAsDone } = require('../controllers/wish-list-controller');

router.get('/wishlist', wishListGet);
router.post('/wishlist', wishListPost);
router.delete('/wishlist/:id', wishListDelete);
router.put('/wishlist', markItemAsDone);

module.exports = router;