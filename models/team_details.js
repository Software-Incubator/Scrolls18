const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamDetailsSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true
    },

    numberOfMembers: {
        type: Number,
        required: true,
        default: 2
    },

    domain: {
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('teamDetails', teamDetailsSchema);