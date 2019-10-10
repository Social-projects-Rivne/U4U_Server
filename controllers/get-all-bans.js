const ban = require('../models/ban.model');

exports.getAllBans = (req, res) => {
  ban.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
