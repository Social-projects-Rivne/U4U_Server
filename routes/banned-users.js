const express = require('express');
const router = express.Router();
const bannedUsers = require('../controllers/get-all-bans');
const {blockUser}= require('../controllers/block-user-controller');

router.get('/banned-users', bannedUsers.getAllBans);
router.post('/block-user', blockUser);
// router.post('/unblock-users', unblockUser);

module.exports = router;