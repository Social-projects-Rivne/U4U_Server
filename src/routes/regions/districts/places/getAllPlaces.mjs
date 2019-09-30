
import MongoPlaceModel from "../../../../models/mongo/place"

export default function (req, res) {
    const { regionId, districtId } = req.params

    const requestParams = new Object()
    if (regionId) requestParams.regionId = regionId
    if (districtId) requestParams.districtId = districtId

    MongoPlaceModel
        .find(requestParams)
        .then(places => res.status(200).send(places))
        .catch(_ => res.status(404).send({ message: "Not Found" }))
}