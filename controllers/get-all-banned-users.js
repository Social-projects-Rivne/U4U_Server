const User = require('../models/user.model');
const Ban = require('../models/ban.model');

exports.getAllUsers = (req, res) => {
  User.findAll({
    include: [{
      model: Ban,
      required: true
     }]
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
