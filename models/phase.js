const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phaseSchema = new Schema({
    phaseName:{
        type: String,
        required:true
    },

    status: {
        type: Boolean,
        default:false
    }
});

module.exports = mongoose.model('phase', phaseSchema);