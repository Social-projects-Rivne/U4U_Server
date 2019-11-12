const express = require('express');

const router = express.Router()
const allUsers = require('../controllers/get-all-users');

router.get('/allUsers', allUsers.getAllUsers);

module.exports = router;