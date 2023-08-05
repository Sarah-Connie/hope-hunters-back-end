const { MissingPerson } = require('../models/missing_persons');


// Get all persons documents in the missingpersons collection belonging to a logged in gereral or police user
const searchUsersMissing = async (request, response) => {
    // Determine if the search parameter can be a number
    if (!isNaN(Number(request.params.search)) && (request.params.search.length < 4)) {
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
    // Determine if the search parameter can be a number and if it is 4 characters long
    } else if (!isNaN(Number(request.params.search)) && (request.params.search.length == 4)) {
        // Search for missingpersons documents by year for the dateLastSeen field.
        // Set up a date range to be January 1st to December 31st of a provided year
        const dateStart = new Date();

        dateStart.setUTCFullYear(parseInt(request.params.search, 10));
        dateStart.setUTCMonth(parseInt(1, 10));
        dateStart.setUTCDate(parseInt(1, 10));

        dateStart.setUTCHours(0, 0, 0);

        const dateMax = new Date();

        dateMax.setUTCFullYear(parseInt(request.params.search, 10));
        dateMax.setUTCMonth(parseInt(12, 10));
        dateMax.setUTCDate(parseInt(31, 10));
        dateMax.setUTCHours(23, 59, 59);

        // Get documents in the missingpersons collection where the cast search parameter
        // is greater than 4 characters long and matches the year on a dateLastSeen field
        // and sort them in descending order for date added
        let searchMissing = await MissingPerson
                                    .find({$or: [{'dateLastSeen': {$gte: dateStart, $lte: dateMax}}, , {'locationLastSeen.postcode': request.params.search}]})
                                    .where('addedBy').equals(request.userID)
                                    .sort('-dateAdded')
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access missing persons documents.'})});
        // Respond with the documents
        return response.status(200).send(searchMissing) 
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