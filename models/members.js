const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    teamId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    college: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    mobno: {
        type: String,
        required: true
    },

    accomodation: {
        type: String,
        required: true
    },

    memberType: {
        type: String,
        required: true
    }
});

let Members = mongoose.model('member', memberSchema);

module.exports = Members;