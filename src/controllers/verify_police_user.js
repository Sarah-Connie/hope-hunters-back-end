const { PoliceUser } = require('../models/police_users');

const { generateJWT } = require('../helper_functions/JWT_management');

const { encryptString } = require('../helper_functions/cryptography_management');


const policeUsersConfirmation = async (request, response) => {
    // Generate JWT and encrypt it
    const jwtoken = encryptString(generateJWT(request.param.email)) 

    // Find the correct PoliceUser document using the supplied email address from sign up and add the new JWT and expiry
    let addJWT = await PoliceUser.findOneAndUpdate(request.param.email, {jwt: jwtoken}, {new: true})
                    .catch(error => { 
                        response.status(401).json({error:'Unable to verify user.'});
                    }) 
    
    if (addJWT) {
        // If JWT was successfully added to a user document return the JWT
        response.status(200).send(addJWT)
    } else {
        // Otherwise return an error
        response.status(400).json({error: 'User account could not be verified'})
    }
};


exports.module = { policeUsersConfirmation }