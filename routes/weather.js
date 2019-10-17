
const { Router } = require('express');
const getCurrentWeather = require('../controllers/weather');

const weatherRouter = Router();

weatherRouter.get('/current', getCurrentWeather);

module.exports = weatherRouter;
