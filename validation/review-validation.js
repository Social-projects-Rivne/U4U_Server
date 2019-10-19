const { check } = require('express-validator');

module.exports = {
  reviewPost: [
    check('comment', 'Comment cannot be empty or must be bigger then 3 letters')
      .isLength({ min: 3 })
      .not().isEmpty(),
    check('rating', 'Please set rating to this place, range 0 - min, 5 - max')
      .not().isEmpty().isInt({min: 0, max: 5}),
    check('placeId', 'Place id field is required')
      .not().isEmpty(),
  ],
};
