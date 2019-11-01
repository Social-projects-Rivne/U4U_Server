const Moderator = require('../models/moderator.model');

exports.createModerator = async (req, res) => {
  try {
    const newModerator = await Moderator.create({
      ...req.body,
      created_at: Date.now(),
    });
    res.status(200).json(newModerator);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
