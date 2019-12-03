const Sequelize = require('sequelize');
const sequelize = require('../config/postgre');

const Moderator = sequelize.define('moderators', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: Sequelize.STRING,
  },
  surname: {
    type: Sequelize.STRING,
  },
  birth_date: {
    type: Sequelize.DATEONLY,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  avatar: {
    type: Sequelize.STRING,
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  updated_at: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: false,
});

const findModerator = async (moderatorId) => {
  return await Moderator.findAll({where: {id: moderatorId}});
}



module.exports = {
  Moderator,
  findModerator
}
