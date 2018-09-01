const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    numberOfMembers: {
        type: Number,
        required: true
    },

    domain: {
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

let Team = mongoose.model('team', teamSchema);

module.exports = Team;
