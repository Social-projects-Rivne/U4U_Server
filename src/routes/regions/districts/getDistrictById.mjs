
import MongoDistrictModel from "../../../models/mongo/district"

export default function (req, res) {
    const { regionId, districtId } = req.params

    const requestParams = { _id: districtId }
    if (regionId) requestParams.regionId = regionId

    MongoDistrictModel
        .find(requestParams)
        .then(district => res.status(200).send(district))
        .catch(_ => res.status(404).send({ message: "Not found" }))
}