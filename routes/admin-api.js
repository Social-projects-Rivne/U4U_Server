const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');
const uploadImage = require('../middlewares/upload-images');
const valid = require('../middlewares/express-validation');
const { admin } = require('../middlewares/route-validator');

router
  .post('/moderator/create',
    uploadImage.single('avatar'),
    valid(admin.createModerator),
    adminController.createModerator);

router.post('/moderator/is-field-unique', valid(admin.checkUniqueField), adminController.checkUniqueField);

module.exports = router;
