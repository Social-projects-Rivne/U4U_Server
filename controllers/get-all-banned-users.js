const { Ban } = require('../models/ban.model');

exports.getAllUsers = (req, res) => {
    Ban.findAll({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
