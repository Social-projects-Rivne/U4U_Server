const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

module.exports = mongoose.model('regions', regionSchema);