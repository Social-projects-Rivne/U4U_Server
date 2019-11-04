const url = require('url');
const Moderator = require('../models/moderator.model');

exports.createModerator = async (req, res) => {
  try {
    const newModerator = await Moderator.create({
      ...req.body,
      is_admin: false,
      created_at: Date.now(),
    });
    res.status(200).json(newModerator);
  } catch (e) {
    res.status(500).send();
  }
};

exports.checkUniqueField = async (req, res) => {
  try {
    const {query} = url.parse(req.url, true);
    console.log(query)
    const { field, value } = query;
    const moderator = await Moderator.findOne({ where: { [field]: value } });

    if (moderator) {
      return res.status(400).json({ err: `Filed: ${field} with value: ${value} already exists` });
    }

    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
};
