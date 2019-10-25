const express = require('express');
const router = express.Router();

const { getAllModerators } = require('../controllers/get-all-moderators');

router.get('/moderators', getAllModerators);

module.exports = router;
