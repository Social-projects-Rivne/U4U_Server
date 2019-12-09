const sequelize = require('../config/postgre');

exports.getAllUsers = (req, res) => {
sequelize.query('SELECT users. * FROM users LEFT JOIN bans ON users.id = bans.user_id WHERE bans.user_id IS NULL')
  .then((data) => {
    res.status(200).send(data[0]);
  })
  .catch(() => {
    res.status(404).send({ message: 'Not Found' });
  });
};

