const { GeneralUser } = require('../models/general_users');

const { generateJWT } = require('../helper_functions/JWT_management');
const { encryptString } = require('../helper_functions/cryptography_management');


const generalUsersConfirmation = async (request, response) => {
    // Generate JWT and encrypt it
    const jwtoken = encryptString(generateJWT(request.params.email)) 

    // Find the correct GeneralUser document using the supplied email address from sign up and add the new JWT and expiry
    let addJWT = await GeneralUser.findOneAndUpdate({email: request.params.email}, {jwt: jwtoken}, {new: true})
                    .catch(error => { 
                        return response.status(400).json({error:'Unable to find user document.'});
                    }) 
                    
    if (addJWT) {
        // If JWT was successfully added to a user document return the JWT
        return response.status(200).json({token: jwtoken})
    } else {
        // Otherwise return an error
        return response.status(400).json({error: 'User account could not be verified'})
    }
};


module.exports = { generalUsersConfirmation }