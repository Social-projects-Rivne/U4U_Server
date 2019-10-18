const { check } = require('express-validator');

module.exports = {
  reviewPost: [
    check('comment', 'Comment cannot be empty or must be bigger then 3 letters')
      .isLength({ min: 3 })
      .not().isEmpty(),
    check('rating', 'Please set rating to this place')
      .not().isEmpty(),
    check('placeId', 'Place id field is required')
      .not().isEmpty(),
  ],
};
