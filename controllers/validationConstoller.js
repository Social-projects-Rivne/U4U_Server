const userModel = require('../models/user.model');

exports.email = async (req, res) => {
    const { email } = req.params;
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
        res.status(400).json({ err: `${email}: not found` });
    }

    res.status(200).json({ email })

}

exports.nickName = async (req, res) => {
	 const { nickname } = req.params;
	 
	 const user = await userModel.findOne({ where: { nickname } });
    if (!user) {
        res.status(400).json({ err: `${nickname}: not found` });
    }

    res.status(200).json({ nickname })
}