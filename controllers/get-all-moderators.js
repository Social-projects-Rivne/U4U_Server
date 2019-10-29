const moderator = require('../models/moderator.model');

exports.getAllModerators = (req, res) => {
  moderator.findAll({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
