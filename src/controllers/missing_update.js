const { MissingPerson } = require('../models/missing_persons');


const updateMissing = async (request, response) => {
    // Find the correct missingpersons document using the _id on the url

    let missing = await MissingPerson.findOne({_id: request.params.id})
                        .catch(error => { 
                            return response.status(400).json({error:'Unable to find missing document.'});
                        })

    if (request.police === true || request.admin === true || request._id === missing._id) {
        let updateMissingPerson = await MissingPerson.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
                            .catch(error => { 
                                return response.status(400).json({error:'Unable to find missing person document.'});
                            });

        if (updateMissingPerson) {
            // return response.status(200).json({message: 'User details successfully updated.'})
            return response.status(200).json(updateMissingPerson)
        } else {
            // Otherwise return an error
            return response.status(400).json({error: 'Unable to update missing person details.'})
        }

    } else {
        return response.status(401).json({error: 'User unauthorised to alter this document.'})
    }    
}

module.exports = { updateMissing }