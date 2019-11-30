const express = require('express');
const { getAllUserData, editUserData } = require('./../controllers/user-controller');

const router = express.Router();

router.post('/user', getAllUserData);
router.post('/user/edit', editUserData);

module.exports = router;
