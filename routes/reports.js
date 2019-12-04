const express = require('express');

const router = express.Router();
const valid = require('../middlewares/express-validation');
const { reportPost } = require('../validation/report-validation');

const { postReport } = require('../controllers/reports-controller');

router.post('/reports', valid(reportPost), postReport);
module.exports = router;
