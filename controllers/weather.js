
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const {
  weather: dsApiKey,
  geocoding: ggcApiKey,
} = require('../config/config').externalApis;

const defaults = {
  lang: 'uk',
  units: 'si',
};

/**
 * Request info from Dark Sky API
 * @param place Place coordinates
 * @param {string} place.latitude Place latitude
 * @param {string} place.longitude Place longitude
 * @param optionals Optional params: lang, units
 * @param {string} optionals.lang Response language (default: uk)
 * @param {string} optionals.units Response units (default: si)
 * */
function requestWeather({ latitude, longitude }, optionals) {
  const query = stringify({
    lang: optionals.lang || defaults.lang,
    units: optionals.units || defaults.units,
    exclude: 'minutely,hourly,daily',
  });
  const targetUri = `https://api.darksky.net/forecast/${dsApiKey}/${latitude},${longitude}?${query}`;
  return fetch(targetUri).then((res) => res.json());
}

/**
 * Request place coordinates from its address
 * @param {string} address place name
 * @param {string} language formattedAddress language
 * */
async function resolveCoords(address, language = defaults.lang) {
  const query = stringify({
    address,
    language,
    key: ggcApiKey,
  });
  const targetUri = `https://maps.googleapis.com/maps/api/geocode/json?${query}`;
  const response = await fetch(targetUri).then((res) => res.json());
  // Place not found
  if (response.status === 'ZERO_RESULTS') {
    // eslint-disable-next-line no-throw-literal
    throw {
      from: 'geocoding',
      message: 'Place not found',
      address,
    };
  }
  // Response ok
  const place = response.results[0]
  return {
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
    formattedAddress: place.formatted_address,
  };
}

async function getCurrentWeather(query) {
  const options = {};
  const optionals = {
    lang: query.lang,
    units: query.units,
  };
  const placeInfo = {};

  if (query.address && query.address.length) {
    const geo = await resolveCoords(query.address, query.lang);
    options.latitude = geo.latitude;
    options.longitude = geo.longitude;
    placeInfo.formattedAddress = geo.formattedAddress;
  }
  else if (query.latitude && query.longitude) {
    options.latitude = query.latitude;
    options.longitude = query.longitude;
  }
  else {
    // eslint-disable-next-line no-throw-literal
    throw {
      from: 'api',
      message: 'Missing required params',
    };
  }

  const weather = await requestWeather(options, optionals);
  if (weather.error) {
    // eslint-disable-next-line no-throw-literal
    throw {
      from: 'weather',
      message: weather.error,
    };
  }
  return {
    place: {
      latitude: Number(options.latitude),
      longitude: Number(options.longitude),
      ...placeInfo,
    },
    currently: weather.currently,
    nearestStation: weather.flags['nearest-station'],
    units: weather.flags.units,
  };
}

module.exports = (req, res) => {
  getCurrentWeather(req.query)
    .then((result) => res.status(200).send({ ok: true, ...result }))
    .catch((error) => res.status(404).send({ ok: false, ...error }));
};
