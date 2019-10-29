const url = require('url');

const User = require('../models/user.model');
const Ban = require('../models/ban.model');
const Business = require('../models/business.model');


exports.getBannedUsers = async (req, res) => {
  try {
    const { query } = url.parse(req.url, true);
    const { offset = 0, limit = 20 } = query;

    const users = await User.findAll({
      offset,
      limit,
      include: [{
        model: Ban,
        required: true,
      }],
    });

    res.status(200).json(users);
  } catch (e) {
    res.status(404).json('Not found');
  }
};

exports.getBusinessUsers = async (req, res) => {
  try {
    const { query } = url.parse(req.url, true);
    const { offset = 0, limit = 20 } = query;

    const users = await User.findAll({
      offset,
      limit,
      where: { is_business: true },
    });

    res.status(200).json(users);
  } catch (e) {
    res.status(404).json('Not found');
  }
};
