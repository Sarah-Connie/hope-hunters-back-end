const { MissingPerson } = require('../models/missing_persons');


// Get all persons documents in the missingpersons collection
const getMissing = async (request, response) => {
    // Get all documents in the missingpersons collection and sort them in descending order of date added
    let missing = await MissingPerson.find({}).sort('-dateAdded')
                                .catch(error => {
                                    return response.status(404).json({error: 'Unable to access general users documents.'})});
    // Respond with the documents
    return response.status(200).send(missing) 
}

module.exports = { getMissing }