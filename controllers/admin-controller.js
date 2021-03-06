const url = require('url');
const { Moderator } = require('../models/moderator.model');
const AdminService = require('../services/admin-service');

const adminService = new AdminService();

exports.createModerator = async (req, res) => {
  try {
    const newModerator = await
    adminService.createModerator({ ...req.body, file: req.file });
    res.status(200).json(newModerator);
  } catch (e) {
    res.status(500).send();
  }
};

exports.checkUniqueField = async (req, res) => {
  try {
    const { query } = url.parse(req.url, true);
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