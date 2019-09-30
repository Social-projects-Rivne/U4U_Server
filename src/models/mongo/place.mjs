
import mongoose, { Schema } from "mongoose"

const placesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: {
        type: Array,
        required: true
    },
    videos: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: Array,
        required: true
    },
    moderateBy: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
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

export default mongoose.model('places', placesSchema)