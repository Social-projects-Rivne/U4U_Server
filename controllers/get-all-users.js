const user = require('../models/user.model');

exports.getAllUsers = (req, res) => {
  user.findAll({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
