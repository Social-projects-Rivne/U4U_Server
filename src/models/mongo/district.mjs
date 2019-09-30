
import mongoose, { Schema } from "mongoose"

const districtsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    placeID: {
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

export default mongoose.model("districts", districtsSchema);