const mongoose = require('mongoose');

const { encryptString } = require('../helper_functions/cryptography_management');


const PoliceUsersSchema = new mongoose.Schema({
    stationName: {
        type: String,
        required: true
    },
    policeAreaCommand: {
        type: String,
        required: true
    },
    policeDistrict: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    jwt: {
      type: String
    }
});

PoliceUsersSchema.pre('findOneAndUpdate', async function(next) {
    if (this._update.password) {
        this._update.password = await encryptString(this._update.password)
    }
    next();
});

const PoliceUser = mongoose.model('PoliceUser', PoliceUsersSchema);

module.exports = { PoliceUser }