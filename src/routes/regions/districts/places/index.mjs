
import { Router } from "express"

import getAllPlaces from "./getAllPlaces"
import getPlaceById from "./getPlaceById"

const placesRouter = Router({ mergeParams: true })

placesRouter.get("/", getAllPlaces)
placesRouter.get("/:placeId", getPlaceById)

export default placesRouter