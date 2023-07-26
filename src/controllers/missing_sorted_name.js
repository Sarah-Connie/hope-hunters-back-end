const { MissingPerson } = require('../models/missing_persons');


// Get all persons documents in the missingpersons collection
const sortMissingName = async (request, response) => {
    // Get all documents in the missingpersons collection and sort them in alphabetical order of the fullName field
    let missing = await MissingPerson.find({})
                                .sort('fullName')
                                .catch(error => {
                                    return response.status(404).json({error: 'Unable to access general users documents.'})});
    // Respond with the documents
    return response.status(200).send(missing) 
}

module.exports = { sortMissingName }