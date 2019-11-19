const express = require('express');

const router = express.Router()
const { getApprovePlaces, approvePlace } = require('../controllers/approve-places-admin');

router.get('/approve-places', getApprovePlaces);
router.put('/approve-places', approvePlace);

module.exports = router;