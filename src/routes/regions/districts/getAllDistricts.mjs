
import MongoDistrictModel from "../../../models/mongo/district"

export default function (req, res) {
    const { regionId } = req.params

    const requestParams = new Object()
    if (regionId) requestParams.regionId = regionId

    MongoDistrictModel
        .find(requestParams)
        .then(districts => res.status(200).send(districts))
        .catch(() => res.status(404).send({ message: "Not Found" }))
}