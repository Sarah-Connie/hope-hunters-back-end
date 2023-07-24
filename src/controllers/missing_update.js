const { MissingPerson } = require('../models/missing_persons');


const updateMissing = async (request, response) => {
    // Find the correct missingpersons document using the _id on the url

    // Search for the correct document with the id provided in the URL parameter
    let missing = await MissingPerson.findOne({_id: request.params.id})
                        .catch(error => { 
                            // If no document found, return an error message
                            return response.status(400).json({error:'Unable to find missing document.'});
                        })

    // Check that the user is a police or admin user, or is the owner of the document
    if (request.police === true || request.admin === true || request._id === missing._id) {
        // If they are, update the document with the corresponding fields from the request.body
        let updateMissingPerson = await MissingPerson.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
                            .catch(error => { 
                                return response.status(400).json({error:'Unable to find missing person document.'});
                            });

        if (updateMissingPerson) {
            // If the document was updated, return the updated document
            return response.status(200).json(updateMissingPerson)
        } else {
            // Otherwise return an error
            return response.status(400).json({error: 'Unable to update missing person details.'})
        }

    } else {
        // If the user is not the owner or an admin or police user, return an error
        return response.status(401).json({error: 'User unauthorised to alter this document.'})
    }    
}

module.exports = { updateMissing }