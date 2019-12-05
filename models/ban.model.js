const Sequelize = require('sequelize');
const sequelize = require('../config/postgre');

const Ban = sequelize.define('bans', {
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
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  banned_by: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ban_start: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ban_end: {
    type: Sequelize.DATE,
  },
  reason: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  timestamps: false,
}); 
const userBlocking = async (body,adminId,res) => {
  try{
const postgreResponse = await Ban.create({
  user_id:body.id,
  banned_by:adminId,
  ban_start:body.ban_start,
  reason:body.reason
})
 await res.status(200).send({
  id:  postgreResponse.user_id,         
  message: 'The user is blocked'
});
  }
  catch (e) {
    res.status(500).send({ message: e });
}
};
const userUnblocking = async (body,res) => {
  try{
    Ban.destroy({
    where: {
      user_id: body.id,
    }
  })
  await res.status(200).send({       
    message: 'The user is unblocked',
    id:body.id
  });
}
catch (e) {
  res.status(500).send({ message: e });
}
};

module.exports = {
  Ban,
  userBlocking,
  userUnblocking
  
}
