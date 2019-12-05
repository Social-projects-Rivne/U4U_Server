const user = require('../models/user.model');

exports.getAllUsers = (req, res) => {
  user.findAll({
    order: [
      ["id", "ASC"]
    ]
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Not Found' });
    });
};
// sequelize.query('SELECT * FROM users LEFT JOIN bans ON users.id = bans.user_id WHERE user_id IS NULL')
//   .then((data) => {
//     res.status(200).send(data[0]);
//   })
//   .catch(() => {
//     res.status(404).send({ message: 'Not Found' });
//   });
