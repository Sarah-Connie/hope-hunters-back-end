const { MissingPerson } = require('../models/missing_persons');


// Get all persons documents in the missingpersons collection belonging to a logged in gereral or police user
const searchUsersMissing = async (request, response) => {
    // Determine if the search parameter can be a number
    if (!isNaN(Number(request.params.search))) {
        // If it can, cast to a Number
        let queryNumber = Number(request.params.search)

        // Get documents in the missingpersons collection that belong to the user 
        // where the cast search parameter matches the age or currentAge field
        // and sort them in descending order for date added
        let missing = await MissingPerson
                                    .find({$or: [{'age.number': queryNumber}, {'currentAge.number': queryNumber}]})
                                    .where('addedBy').equals(request.userID)
                                    .sort('-dateAdded')
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access missing persons documents.'})});
        // Respond with the documents
        return response.status(200).send(missing) 
    // Else, perform a fuzzy search on the fullName, areaSuspectedToBe, hairColour, eyeColour, complexion, and distinctiveFeatures fields
    } else {
        // Get all documents that belong to the user and match with 3 or more characters in the search field
        let missing = await MissingPerson
                                    .fuzzySearch({query: request.params.search, minSize: 3})
                                    .where('addedBy').equals(request.userID)
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access missing persons documents.'})});
        // Respond with the documents
        return response.status(200).send(missing) 
    }
}

module.exports = { searchUsersMissing }