const { check } = require('express-validator');

module.exports = {
  reportPost: [
    check('report', 'Report cannot be empty or less then 3 letters')
      .isLength({ min: 3 })
      .not()
      .isEmpty(),
    check('placeId', 'Place id field is required')
      .not()
      .isEmpty()
  ]
};
