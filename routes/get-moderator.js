const express = require('express');
const router = express.Router();

const { getModerator } = require('../controllers/get-moderator');

router.get('/currentModerator', getModerator);

module.exports = router;