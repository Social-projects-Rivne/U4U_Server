const { reportModel, getAllReports } = require('../models/reports.model');
const tokenservice = require('../services/token-service');
const { places } = require('../models/places.model');
const { jwtConf } = require('../config/config');
const sequelize = require('../config/postgre');
const userModel  = require('../models/user.model');
const tokenService = new tokenservice(jwtConf);

exports.getAllReports = async (req, res) => {
    try {
      const reports = await getAllReports();

      const userIds = reports.map((elem) => {
          return elem.userId;
      });

      const placesReportIds = reports.map((elem) => {
          return elem.placeId;
      });

      const usersList = await sequelize.query('SELECT email, id FROM users WHERE id IN ' + '(' + userIds + ')');
      const ReportPlaces = await places.find({ _id: placesReportIds });

      const result = [];

      reports.map((reportItem) => {
          usersList[0].find((user) => {
              ReportPlaces.find((place) => {
                 if(+reportItem.userId === +user.id && reportItem.placeId.toString() === place._id.toString()){
                    result.push({ createdBy: user.email, placeName: place.name, reportComment: reportItem.comment, createdAt: reportItem.createdAt, solved: reportItem.isSolved });
                 }
              })
          })
      })


      res.status(200).send(result);
    } catch (error) {
      res.status(404).send({ message: '404 Not found' });
    }
};