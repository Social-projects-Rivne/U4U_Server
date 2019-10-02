const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Use  http://localhost:8080/api');
});

module.exports = router;
