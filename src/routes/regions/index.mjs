
import { Router } from "express"

import getAllRegions from "./getAllRegions"
import getRegionById from "./getRegionById"
import districtsRouter from "./districts/index"

const regionsRouter = Router()

regionsRouter.get("/", getAllRegions)
regionsRouter.use("/districts", districtsRouter)

regionsRouter.get("/:regionId", getRegionById)
regionsRouter.use("/:regionId/districts", districtsRouter)

export default regionsRouter