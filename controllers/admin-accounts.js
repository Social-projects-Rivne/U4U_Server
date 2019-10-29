const banModel = require('../models/ban.model.js');
const userModel = require('../models/user.model.js');

exports.getBanedAccounts = async (req, res) => {
	try {
		const { offset = 0, limit = 20 } = req.body;
		const bans = await banModel.findAll({ offset, limit, include:[userModel] });
		res.send(bans);
	} catch(err) {
		console.log(err);
		res.status(500).send();
	}
};

