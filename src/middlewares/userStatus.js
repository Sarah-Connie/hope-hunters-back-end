const { decryptString } = require('../helper_functions/cryptography_management');
const { GeneralUser } = require('../models/general_users');
const { PoliceUser } = require('../models/police_users');


// Get the user and attached the _id, admin status and police status to the request
const getUserStatus = (request, response, next) => {
        // If true, correct user document will be in policeusers collection
        if ((request.user).includes('@police.nsw.gov.au')) {
            // Search for user document
            PoliceUser.findOne({email: request.user})
                                .then(user => {
                                    // If the user document was found, attach the user _id, police status and admin status to the request
                                    request.userID = user._id;
                                    request.police = true;
                                    request.admin = false;
                                    request.district = user.policeDistrict
                                    next();
                                })
                                .catch(error => { 
                                    // Else return an error message
                                    return response.status(400).json({error:'Unable to find user document.'});
                                })
        // Else, search in generalusers collection
        } else {
            // Search for user document
            GeneralUser.findOneAndUpdate({email: request.user})
                            .then(user => {
                                // If the user document was found, attach the user _id, police status and admin status to the request
                                request.userID = user._id;
                                request.police = false;
                                request.admin = user.admin;
                                next();
                            })
                            .catch(error => { 
                                return response.status(400).json({error:'Unable to find user document.'});
                            }) 
    };
}

module.exports = { getUserStatus }