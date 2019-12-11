const { reportModel, getAllReports } = require('../models/reports.model');
const tokenservice = require('../services/token-service');
const placeModel = require('../models/places.model');
const { jwtConf } = require('../config/config');
const tokenService = new tokenservice(jwtConf);

exports.getReportsById = async (req, res) => {
  try {
    const { reportId } = req.params;
    const reportById = await reportModel.find({ placeId: reportId });
    res.status(200).send(reportById);
  } catch (err) {
    res.status(404).send({ message: 'Not found' });
  }
};

exports.postReport = async (req, res) => {
  try {
    const { placeId, report, userJwt } = req.body;
    const place = await placeModel.places.findOne({ _id: placeId });
    if (!place) {
      throw 'Sorry invalid id of place, try later';
    }

    const userId = await tokenService.verify(userJwt);

    await reportModel.create({
      placeId: placeId,
      userId: userId,
      comment: report,
      isSolved: false,
    });

    await res.status(200).send({ message: 'Thanks, we added your report' });
  } catch (e) {
    res.status(500).send({ message: 'Wrong id of place or invalid JWT' });
  }
};
