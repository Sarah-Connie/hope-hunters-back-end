import mongoose from 'mongoose';


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
    jwt: String,
    expiry: {
        type: Date,
        expires: Date.now() + 7
    }
  }
});

const PoliceUser = mongoose.model('PoliceUser', PoliceUsersSchema);

module.exports = PoliceUser