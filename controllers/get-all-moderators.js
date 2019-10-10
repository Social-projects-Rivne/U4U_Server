const moderator = require('../models/moderator.model');

exports.getAllModerators = (req, res) => {
  moderator.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
