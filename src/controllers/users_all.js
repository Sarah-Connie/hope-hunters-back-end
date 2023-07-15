// Route to get all user documents. Route is intended for development purposes only.

const GeneralUser = require('../models/general_users');
const PoliceUser = require('../models/police_users');


// Get all user documents in the policeusers and generalusers collections
const getUsers = async (request, response) => {
    // Get all documents in the generalusers collection
    let generalUsers = await GeneralUser.find()
                                .catch(error => {response.status(400).json({error: 'Unable find general users.'})})
    // Get all documents in the policeusers collection
    let policeUsers = await PoliceUser.find()
                                .catch(error => {response.status(400).json({error: 'Unable find police users.'})})
    // Response with documents in two arrays
    response.status(200).send([generalUsers, policeUsers])    
}

module.exports = { getUsers }