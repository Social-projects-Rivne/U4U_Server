const { Moderator } = require('../models/moderator.model');

exports.getAllModerators = (req, res) => {
  Moderator.findAll({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};