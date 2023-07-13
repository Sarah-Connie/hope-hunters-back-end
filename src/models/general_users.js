const mongoose = require('mongoose');


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

const GeneralUser = mongoose.model('GeneralUser', GeneralUsersSchema);

module.exports = GeneralUser