const express = require('express');

const router = express.Router();

// require controllers "getAllMap"
const {
  getAllRegions,
  getAllDistricts,
  getAllPlaces,
} = require('../controllers/getAllMap');

// require contollers "getMapById"
const {
  getRegionById,
  getDistrictById,
  getPlaceById,
  getAllDistrictsByIdRegion,
  getRegionByIdAndDistrictById,
  getRegionByIdAndDistrictByIdPlaces,
  getRegionByIdDistrictByIdPlaceById,
  getAllPlacesByRegionId,
} = require('../controllers/getMapById');

// Basic "/api" route
router.get('/', (req, res) => {
  res.status(200).send(
    [
      { regions: '/regions' },
      { districts: '/regions/districts' },
      { places: '/regions/districts/places' },
      { regionById: '/regions/:id' },
      { district: '/regions/districts/:id' },
      { place: '/regions/districts/places/:id' },
      { allDistrictsInRegionById: '/regions/:id/districts' },
      { districtByIdInRegionById: '/regions/:id/districts/:id2' },
      { allPlacesInDistrictByIdAndRegionById: '/regions/:id/districts/:id2/places' },
      { RegionByIdDistrictByIdPlaceById: '/regions/:id/districts/:id2/places/:id3' },
      { AllPlacesByRegionId: '/regions/:RegionId/places' },
    ],
  );
});

// Routers with controllers
router.get('/regions', getAllRegions);
router.get('/regions/districts', getAllDistricts);
router.get('/regions/districts/places', getAllPlaces);

router.get('/regions/:RegionId', getRegionById);
router.get('/regions/districts/:DistrictId', getDistrictById);
router.get('/regions/districts/places/:PlaceId', getPlaceById);

router.get('/regions/:RegionId/districts', getAllDistrictsByIdRegion);
router.get('/regions/:RegionId/districts/:DistrictId', getRegionByIdAndDistrictById);
router.get('/regions/:RegionId/districts/:DistrictId/places', getRegionByIdAndDistrictByIdPlaces);
router.get('/regions/:RegionId/districts/:DistrictId/places/:PlaceId', getRegionByIdDistrictByIdPlaceById);

router.get('/regions/:RegionId/places', getAllPlacesByRegionId);

module.exports = router;
