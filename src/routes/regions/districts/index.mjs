
import { Router } from "express"

import getAllDistricts from "./getAllDistricts"
import getDistrictById from "./getDistrictById"
import placesRouter from "./places/index"

const districtsRouter = Router({ mergeParams: true })

districtsRouter.get("/", getAllDistricts)
districtsRouter.use("/places", placesRouter)

districtsRouter.get("/:districtId", getDistrictById)
districtsRouter.use("/:districtId/places", placesRouter)

export default districtsRouter