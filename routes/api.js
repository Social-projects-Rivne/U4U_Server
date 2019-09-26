var express = require('express');
var router = express.Router();

// controllers
const {getAllRegions, getAllDistricts, getAllPlaces} = require('../controllers/getAllMap');
const {getRegionById, getDistrictById, getPlaceById} = require('../controllers/getMapById');

router.get('/', (req, res) => {
  res.status(200).send( 
    [
      {regions: '/regions'},
      {districts: '/regions/districts'},
      {places: '/regions/districts/places'},
      {regionById: '/regions/:id'},
      {district: '/regions/districts/:id'},
      {place: '/regions/districts/places/:id'}
    ]
  );
});

router.get('/regions', getAllRegions);
router.get('/regions/districts', getAllDistricts);
router.get('/regions/districts/places', getAllPlaces);

router.get('/regions/:id', getRegionById);
router.get('/regions/districts/:id', getDistrictById);
router.get('/regions/districts/places/:id', getPlaceById);

module.exports = router;
