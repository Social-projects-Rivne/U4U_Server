const express = require('express');
const { getAllUserData } = require('./../controllers/user-controller');

const router = express.Router();

router.post('/', getAllUserData);

module.exports = router;
