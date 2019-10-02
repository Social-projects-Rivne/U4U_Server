### API Server for Ukraine4You

State: in development

---

### Basic routes

1. GET /api/regions : get all regions
1. GET /api/regions/districts : get all districts from all regions
1. GET /api/regions/districts/places : get all places from all districts from all regions
1. GET /api/regions/districts/{ districtId }
1. GET /api/regions/districts/places/{ placeId }

1. GET /api/regions/{ regionId }/ : get region info by ID
1. GET /api/regions/{ regionId }/districts : get all districts from selected region
1. GET /api/regions/{ regionId }/districts/{ districtId } : get district by ID from selected region
1. GET /api/regions/{ regionId }/districts/{ districtId }/places : get all available places from selected region and district
1. GET /api/regions/{ regionId }/districts/{ districtId }/places/{ placeId } : get place by ID from selected region and district
1. GET /api/regions/{ regionId }/places : get all places by region id

---

### Guide: init server

1. Create `.env` in root directory
1. Set environment constant for mongoDB `mongoUri=mongodb+srv://<username>:<password>@cluster0-q5xnz.mongodb.net/Ukraine4You?retryWrites=true&w=majority`
1. Set environment constant for Postres DB `sqlDataBase=<Name of DB>, sqlPassword=<Your DB password>, sqlPort=<Port>, host=<host>`
1. Replace `<username>` and `<password>` with your credentials
1. Install dependencies with `npm i` command
1. Run server with `npm start`
1. Open in browser `http://localhost:8080`
