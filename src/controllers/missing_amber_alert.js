const { MissingPerson } = require('../models/missing_persons');


// Get all documents in missingpersons collections where amberAlert field equals true
const searchAmberAlert = async (request, response) => {
    // Get all documents in the missingpersons collection
    // where the amberAlert field is true
    // and sort them in descending order of dateAdded
    let amberAlerts = await MissingPerson
                                .find({amberAlert: true})
                                .sort('-dateAdded')
                                .catch(error => {
                                    return response.status(404).json({error: 'Unable to access general users documents.'})});
    // Respond with the documents
    return response.status(200).send(amberAlerts) 
}

module.exports = { searchAmberAlert }