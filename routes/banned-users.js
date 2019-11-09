const express = require('express');

const router = express.Router()
const bannedUsers = require('../controllers/get-all-bans');

router.get('/banned-users', bannedUsers.getAllBans);

module.exports = router;