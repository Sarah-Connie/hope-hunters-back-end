const { MissingPerson } = require('../models/missing_persons');


// Search for documents in the missingpersons collection
const searchAllMissing = async (request, response) => {
    // Determine if the search parameter can be a number
    if (!isNaN(Number(request.params.search))) {
        // console.log(Number(request.params.search) === 'number')
        // If it can, cast to a Number
        let queryNumber = Number(request.params.search)

        // Get documents in the missingpersons collection where the cast search parameter 
        // matches the age or currentAge field on one or more documents
        // and sort them in descending order for date added
        let searchMissing = await MissingPerson
                                    .find({$or: [{'age.number': queryNumber}, {'currentAge.number': queryNumber}]})
                                    .sort('-dateAdded')
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access general users documents.'})});
        // Respond with the documents
        return response.status(200).send(searchMissing) 
    // Else, perform a fuzzy search on the fullName, areaSuspectedToBe, hairColour, eyeColour, complexion, and distinctiveFeatures fields
    } else {
        // Get all documents that match with 3 or more characters in the search field
        let searchMissing = await MissingPerson
                                    .fuzzySearch({query: request.params.search, minSize: 3})
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access general users documents.'})});
        // Respond with the documents
        return response.status(200).send(searchMissing) 
    }
}

module.exports = { searchAllMissing }