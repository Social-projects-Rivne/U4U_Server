const token = require('../models/token.model');

exports.getAlltokens = (req, res) => {
  token.findAll({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
