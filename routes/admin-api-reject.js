const express = require('express');
const router = express.Router();

const { rejectPlace } = require('../controllers/admin-reject');

router.put('/reject', rejectPlace);

module.exports = router;