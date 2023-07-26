const { MissingPerson } = require('../models/missing_persons');


// Get all persons documents in the missingpersons collection belonging to a logged in gereral or police user
const getUsersMissing = async (request, response) => {
    // Get all documents that belong to the user and match with 3 or more characters in the search field
    let missing = await MissingPerson
                            .find({})
                            .sort('-dateAdded')
                            .where('addedBy').equals(request.userID)
                            .catch(error => {
                                return response.status(404).json({error: 'Unable to access missing persons documents.'})});
    // Respond with the documents
    return response.status(200).send(missing) 
    
}

module.exports = { getUsersMissing }