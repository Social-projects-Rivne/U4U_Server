const express = require('express');

const router = express.Router()
const bannedUsers = require('../controllers/get-all-banned-users');

router.get('/banned-users', bannedUsers.getAllUsers);

module.exports = router;