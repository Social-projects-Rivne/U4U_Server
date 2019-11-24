const express = require('express');

const router = express.Router()
const { getApprovePlaces, approvePlace, getApprovedPlaces, getRejectedPlaces } = require('../controllers/approve-places-admin');

router.get('/approve-places', getApprovePlaces);
router.put('/approve-places', approvePlace);
router.get('/approved-places', getApprovedPlaces);
router.get('/rejected-places', getRejectedPlaces);

module.exports = router;