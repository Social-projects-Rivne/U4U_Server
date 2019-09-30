
import MongoPlaceModel from "../../../../models/mongo/place"

export default function (req, res) {
    const { regionId, districtId, placeId } = req.params

    const requestParams = { _id: placeId }
    if (regionId) requestParams.regionId = regionId
    if (districtId) requestParams.districtId = districtId
    
    MongoPlaceModel
        .find(requestParams)
        .then(places => res.status(200).send(places))
        .catch(_ => res.status(404).send({ message: "Not Found" }))
}

//TODO: select between two codestyles

// export async function test(req, res) {
//     const { regionId, districtId, placeId } = req.params

//     try {
//         const places = await MongoPlaceModel.find({ _id: placeId })
//         res.status(200).send(places)
//     } catch (_) {
//         res.status(404).send({ message: "Not Found" })
//     }
// }