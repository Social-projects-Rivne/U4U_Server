
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const { weatherApiKey: apiKey } = require('../config/config');

const defaults = {
  lang: 'uk',
  units: 'si',
  timezone: 'Europe/Kiev',
};

/**
 * @param place Place coordinates
 * @param {string} place.latitude Place latitude
 * @param {string} place.longitude Place longitude
 * @param optionals Optional params: lang, units
 * @param {string} optionals.lang Response language (default: uk)
 * @param {string} optionals.units Response units (default: si)
 * */
function apiRequest({ latitude, longitude }, optionals) {
  const query = stringify({
    lang: optionals.lang || defaults.lang,
    units: optionals.units || defaults.units,
    exclude: 'minutely,hourly,daily',
  });
  const targetUri = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?${query}`;
  return fetch(targetUri).then((res) => res.json());
}

function getCurrent(req, res) {
  const options = {
    latitude: req.query.latitude,
    longitude: req.query.longitude,
  };
  const optionals = {
    lang: req.query.lang,
    units: req.query.units,
  };
  apiRequest(options, optionals)
    .then((apiResponse) => {
      const response = {
        currently: apiResponse.currently,
        nearestStation: apiResponse.flags['nearest-station'],
        units: apiResponse.flags.units,
      };
      res.status(200).send(response);
    })
    .catch((error) => res.status(404).send(error));
}

module.exports = getCurrent;
