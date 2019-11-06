const express = require('express');
const router = express.Router();

const { getAllBusiness } = require('../controllers/get-all-business');

router.get('/business', getAllBusiness);

module.exports = router;
