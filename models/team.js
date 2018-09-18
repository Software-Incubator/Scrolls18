const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true,
        unique: true
    },

    teamId: {
        type:String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    resetPasswordToken:{
        type:String,
        default: null
    }
});

let Team = mongoose.model('team', teamSchema);

module.exports = Team;
