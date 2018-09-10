const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({
    date: {
        type: String,
        required: true
    },

    month: {
        type:String,
        required: true
    },

    year:{
        type: String,
        default: '2018',
        required: true
    },

    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('impDates', dateSchema);