const express = require('express');
const adminController = require('../controllers/admin-controller');
const uploadImage = require('../middlewares/upload-images');
const valid = require('../middlewares/express-validation');
const { admin } = require('../middlewares/route-validator');

const router = express.Router();

router
  .post('/moderator/create',
    uploadImage.single('avatar'),
    valid(admin.createModerator),
    adminController.createModerator);

router.post('/moderator/is-field-unique', valid(admin.checkUniqueField), adminController.checkUniqueField);

module.exports = router;
