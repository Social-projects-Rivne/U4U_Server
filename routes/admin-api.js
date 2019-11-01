const express = require('express');
const adminController = require('../controllers/admin-controller');
const valid = require('../middlewares/express-validation');
const { admin } = require('../middlewares/route-validator');
const router = express.Router();

router.post('/moderator/create', valid(admin.createModerator), adminController.createModerator);

module.exports = router;
