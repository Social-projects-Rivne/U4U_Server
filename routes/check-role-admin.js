const express = require('express');
const { checkRole } = require('../controllers/check-role-admin');
const router = express.Router();

router.post('/role', checkRole);

module.exports = router;