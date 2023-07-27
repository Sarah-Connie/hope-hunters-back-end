const { MissingPerson } = require('../models/missing_persons');


// Get all persons documents in the missingpersons collection sorted as per the request
const sortMissing = async (request, response) => {
    switch(request.params.option) {
        case 'fullName':
            // Get all documents in the missingpersons collection and sort them in alphabetical order of the fullName field
            let missingFullName = await MissingPerson
                                    .find({})
                                    .sort('fullName')
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access general users documents.'})});
            // Respond with the documents
            return response.status(200).send(missingFullName);

        case 'lastSeen':
            // Get all documents in the missingpersons collection and sort them in alphabetical order of the locationLastSeen.city field
            let missingLocationLastSeen = await MissingPerson
                                    .find({})
                                    .sort('locationLastSeen.city')
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access general users documents.'})});
            // Respond with the documents
            return response.status(200).send(missingLocationLastSeen);

        case 'ageYoungest':
            // Get all documents in the missingpersons collection and sort them in order of the youngest to oldest of the age field
            let missingAgeYoungest = await MissingPerson
                                    .find({})
                                    .sort('age.type')
                                    .sort('age.number')
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access general users documents.'})});
            // Respond with the documents
            return response.status(200).send(missingAgeYoungest);

        case 'ageOldest':
            // Get all documents in the missingpersons collection and sort them in order of the oldest to youngest of the age field
            let missingAgeOldest = await MissingPerson
                                    .find({})
                                    .sort('-age.type')
                                    .sort('-age.number')
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access general users documents.'})});
            // Respond with the documents
            return response.status(200).send(missingAgeOldest);

        case 'currentAge':
            // Get all documents in the missingpersons collection and sort them in order of the youngest to oldest of the age field
            let missingCurrentAge = await MissingPerson
                                    .find({})
                                    .sort('currentAge.type')
                                    .sort('currentAge.number')
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access general users documents.'})});
            // Respond with the documents
            return response.status(200).send(missingCurrentAge);

        case 'dateLastSeenNewest':
            // Get all documents in the missingpersons collection and sort them from the most recent to the oldest by the dateLastSeen field
            let missingDateLastSeenNewest = await MissingPerson
                                    .find({})
                                    .sort('-dateLastSeen')
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access general users documents.'})});
            // Respond with the documents
            return response.status(200).send(missingDateLastSeenNewest);

        case 'dateLastSeenOldest':
            // Get all documents in the missingpersons collection and sort them from the oldest to the the most recent by the dateLastSeen field
            let missingDateLastSeenOldest = await MissingPerson
                                    .find({})
                                    .sort('dateLastSeen')
                                    .catch(error => {
                                        return response.status(404).json({error: 'Unable to access general users documents.'})});
            // Respond with the documents
            return response.status(200).send(missingDateLastSeenOldest);
    }     
}

module.exports = { sortMissing }