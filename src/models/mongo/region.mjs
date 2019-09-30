
import mongoose, { Schema } from "mongoose"

const regionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    regionalCenter: {
        type: String,
        required: true
    },
    districtsID: {
        type: Array,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updateAt: {
        type: String,
        required: true
    }
})

export default mongoose.model('regions', regionSchema)