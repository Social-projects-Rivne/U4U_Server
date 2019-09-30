
### API Server for Ukraine4You

State: in development

---

### Basic routes

1. GET /regions : get all regions
1. GET /regions/districts : get all districts from all regions
1. GET /regions/districts/places : get all places from all districts from all regions
1. GET /regions/districts/{ districtId }
1. GET /regions/districts/places/{ placeId }

1. GET /regions/{ regionId }/ : get region info by ID
1. GET /regions/{ regionId }/districts : get all districts from selected region
1. GET /regions/{ regionId }/districts/{ districtId } : get district by ID from selected region
1. GET /regions/{ regionId }/districts/{ districtId }/places : get all available places from selected region and district
1. GET /regions/{ regionId }/districts/{ districtId }/places/{ placeId } : get place by ID from selected region and district

---

### Guide: init server

1. Create `.env` in root directory
1. Set environment constant `mongoUri=mongodb+srv://<username>:<password>@cluster0-q5xnz.mongodb.net/Ukraine4You?retryWrites=true&w=majority`
1. Replace `<username>` and `<password>` with your credentials
1. Install dependencies with `npm i` command
1. Run server with `npm start`
1. Open in browser `http://localhost:8080`