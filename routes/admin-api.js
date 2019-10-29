const express = require('express');
const router = express.Router();

const accountsController = require('../controllers/admin-accounts.js');

router.get('/bans', accountsController.getBanedAccounts);

module.exports = router;
