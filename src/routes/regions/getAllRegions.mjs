
import MongoRegionModel from "../../models/mongo/region"

export default function (_, res) {
    MongoRegionModel
        .find({})
        .then(regions => res.status(200).send(regions))
        .catch(_ => res.status(404).send({ message: "Not found" }))
}