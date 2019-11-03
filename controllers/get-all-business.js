const business = require('../models/business.model');

exports.getAllBusinesses = (req, res) => {
  business.findAll({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
