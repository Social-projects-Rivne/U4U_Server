
import MongoRegionModel from "../../models/mongo/region"

export default function (req, res) {
    const { regionId } = req.params

    MongoRegionModel
        .findById(regionId)
        .then(region => res.status(200).send(region))
        .catch(_ => res.status(404).send({ message: "Not found" }))
}