const User = require('../models/user.model');

exports.getAllBusiness = (req, res) => {

  User.findAll({where: { is_business: true }})
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(() => {
    res.status(404).send({ message: 'Not Found' });
  });
};
