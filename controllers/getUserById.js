const users = require('../models/user.model');

exports.getUserById = (req, res) => {
  const { UserId } = req.params;
  users.findById(UserId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};