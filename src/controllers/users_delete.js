const { GeneralUser } = require('../models/general_users');
const { PoliceUser } = require('../models/police_users');


const deleteUsers = async (request, response) => {
    // Identify if user is trying to login in as a police or general user by checking the supplied email address
    // If true, user is a police user
    if ((request.user).includes('@police.nsw.gov.au')) {
        // Find the correct policeusers document using the email address added to the request from the JWT middleware during validation and delete the document
        let deletedUser = await PoliceUser.findOneAndDelete({email: request.user})
                            .catch(error => { 
                                return response.status(400).json({error:'Unable to find user document.'});
                            })
        
        // If the user document was successfully deleted, return a success message
        if (deletedUser) {
            return response.status(200).json({message: `User document for ${deletedUser.fullName} successful deleted.`})
        } else {
            // Otherwise return an error
            return response.status(400).json({error: 'Unable to delete user document.'})
        }
    // Else, user is a General User or details are invalid
    } else {
        // Find the correct policeusers document using the email address added to the request from the JWT middleware during validation and delete the document
        let deletedUser = await GeneralUser.findOneAndDelete({email: request.user})
                            .catch(error => { 
                                return response.status(400).json({error:'Unable to find user document.'});
                            })
        
        // If the user document was successfully deleted, return a success message
        if (deletedUser) {
            return response.status(200).json({message: `User document for ${deletedUser.fullName} successful deleted.`})
        } else {
            // Otherwise return an error
            return response.status(400).json({error: 'Unable to delete user document.'})
        }
    }
}

module.exports = { deleteUsers }