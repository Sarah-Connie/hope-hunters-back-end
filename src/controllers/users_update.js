const { GeneralUser } = require('../models/general_users');
const { PoliceUser } = require('../models/police_users');


const updateUsers = async (request, response) => {
    // Identify if user is trying to login in as a police or general user by checking the supplied email address
    // If true, user is a police user
    if ((request.user).includes('@police.nsw.gov.au')) {
        // Find the correct policeusers document using the email address added to the request from the JWT middleware during validation
        // And update the user document with the supplied fields
        let updatedUser = await PoliceUser.findOneAndUpdate({email: request.user}, request.body, {new: true})
                            .catch(error => { 
                                return response.status(400).json({error:'Unable to find user document.'});
                            })
        
        // If the user document was successfully updated, return a success message
        if (updatedUser) {
            return response.status(200).json({message: 'User details successfully updated.'})
        } else {
            // Otherwise return an error
            return response.status(400).json({error: 'Unable to update user details.'})
        }
    // Else, user is a General User or details are invalid
    } else {
        // Find the correct generalusers document using the email address added to the request from the JWT middleware during validation
        // And update the user document with the supplied fields
        let updatedUser = await GeneralUser.findOneAndUpdate({email: request.user}, request.body, {new: true})
                            .catch(error => { 
                                return response.status(400).json({error:'Unable to find user document.'});
                            })
        
        // If the user document was successfully updated, return a success message
        if (updatedUser) {
            return response.status(200).json({message: 'User details successfully updated.'})
        } else {
            // Otherwise return an error
            return response.status(400).json({error: 'Unable to update user details.'})
        }
    }
}

module.exports = { updateUsers }