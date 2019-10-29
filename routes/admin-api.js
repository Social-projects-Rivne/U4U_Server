const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

// list of banned users with offset pagination
router.get('/bans', userController.getBannedUsers);

// list of business users with offset pagination
router.get('/business', userController.getBusinessUsers);

module.exports = router;
