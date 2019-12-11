const express = require('express');

const router = express.Router();

const { getAllReports } = require('../controllers/admin-places-report');

router.get('/reports', getAllReports);

module.exports = router;
