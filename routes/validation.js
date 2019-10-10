const express = require('express');
const validController = require('../controllers/validation-constoller.js');

const router = express.Router();

router.get('/email/:email', validController.email);

router.get('/nickname/:nickname', validController.nickName);

module.exports = router;