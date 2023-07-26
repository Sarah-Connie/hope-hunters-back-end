const mongoose = require('mongoose');

const { encryptString } = require('../helper_functions/cryptography_management');


const GeneralUsersSchema = new mongoose.Schema({
    fullName: {
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
    admin: {
        type: Boolean,
        default: false
    },
    jwt: {
        type: String
    }
});

GeneralUsersSchema.pre('findOneAndUpdate', async function(next) {
    if (this._update.password) {
        this._update.password = await encryptString(this._update.password)
    }
    next();
});

const GeneralUser = mongoose.model('GeneralUser', GeneralUsersSchema);

module.exports = { GeneralUser }