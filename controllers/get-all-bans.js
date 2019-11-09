const sequelize = require('../config/postgre');

exports.getAllBans = (req, res) => {
  sequelize.query('SELECT moderators.email as moderator_email, users.email as user_email, bans.ban_start, bans.ban_end, bans.reason FROM moderators, users, bans WHERE (users.id = bans.user_id) AND (moderators.id = bans.banned_by)')
  .then((data) => {
    res.status(200).send(data[0]);
  })
  .catch(() => {
    res.status(404).send({ message: 'Not Found' });
  });
};