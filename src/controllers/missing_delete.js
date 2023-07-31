const { MissingPerson } = require('../models/missing_persons');


const deleteMissing = async (request, response) => {
    // Find the correct missingpersons document using the _id on the url

    // Search for the correct document with the id provided in the URL parameter
    let missing = await MissingPerson.findOne({_id: request.params.id})
                        .catch(error => { 
                            // If no document found, return an error message
                            return response.status(400).json({error:'Unable to find missing document.'});
                        })

    // Check that the user is a police or admin user, or is the owner of the document
    if (request.police === true || request.admin === true || missing.addedBy[0].equals(request.userID)) {
        // If they are, permanently delete the document
        let deleteMissingPerson = await MissingPerson.findOneAndDelete({_id: request.params.id})
                            .catch(error => { 
                                return response.status(400).json({error:'Unable to find missing person document.'});
                            });

        if (deleteMissingPerson) {
            // If the document was deleted, return a success message
            return response.status(200).json({message: 'Missing person listing successfully deleted.'})
        } else {
            // Otherwise return an error
            return response.status(400).json({error: 'Unable to delete missing person listing'})
        }

    } else {
        // If the user is not the owner or an admin or police user, return an error
        return response.status(401).json({error: 'User unauthorised to alter this document.'})
    }    
}

module.exports = { deleteMissing }