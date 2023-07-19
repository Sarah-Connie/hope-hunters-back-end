const { GeneralUser } = require('../models/general_users');
const { PoliceUser } = require('../models/police_users');

const { generateJWT } = require("../helper_functions/JWT_management");
const { encryptString, decryptString } = require('../helper_functions/cryptography_management');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


const refreshJWT = async (request, response) => {
    // Get JWT from request header and decrypt it
    let suppliedToken = decryptString(request.headers.authorization.split(" ")[1]);

    // If no JWT send response with an error message
    if (!suppliedToken) {
        return response.status(401).json({error: 'User authorisation could not be verified.'});
    }

    // Verify the token on the request header and generate a new JWT
    jwt.verify(suppliedToken, process.env.JWT_SECRET, async (error, decodedJWT) => {
        if (error) {
            response.status(401).json({error: 'User authorisation could not be verified.'});
        }

        let newToken = encryptString(generateJWT(decodedJWT.email));

        // return newToken;

        if ((decodedJWT.email).includes('@police.nsw.gov.au')) {
            // // Otherwise, try to find the user document by querying the police users collection with the old token
            let updatePoliceToken = await PoliceUser.findOneAndUpdate({email: decodedJWT.email}, {jwt: newToken}, {new: true}) 
                                            .catch(error => { 
                                                return response.status(401).json({error:'Unable to update JWT in user document.'});
                                            })
            if (updatePoliceToken) {
                // If JWT was successfully updated on a document in the police users collection return the new JWT
                return response.status(200).json({token: newToken})
                }
        } else {
            // Try to find the user document by querying the general users collection with the old token
            let updateGeneralToken = await GeneralUser.findOneAndUpdate({email: decodedJWT.email}, {jwt: newToken}, {new: true}) 
                                            .catch(error => { 
                                                return response.status(401).json({error:'Unable to update JWT in user document.'});
                                            })
            if (updateGeneralToken) {
                // If JWT was successfully updated on a document in the general users collection return the new JWT
                return response.status(200).json({token: newToken})
            } else {
                // Otherwise return an error
                return response.status(400).json({error: 'Unable to update JWT'})
                } 
        }
    });
    
    
    // // Try to find the user document by querying the general users collection with the old token
    // let updateGeneralToken = await GeneralUser.findOneAndUpdate({jwt: request.headers.authorization.split(" ")[1]}, {jwt: updatedToken}, {new: true}) 
    //                             .catch(error => { 
    //                                 return response.status(401).json({error:'Unable to update JWT in user document.'});
    //                             })
    // if (updateGeneralToken) {
    //     // If JWT was successfully updated on a document in the general users collection return the new JWT
    //     return response.status(200).json({token: updatedToken})
    // }
    
    // // // Otherwise, try to find the user document by querying the police users collection with the old token
    // let updatePoliceToken = await PoliceUser.findOneAndUpdate({jwt: request.headers.authorization.split(" ")[1]}, {jwt: updatedToken}, {new: true}) 
    //                             .catch(error => { 
    //                                 return response.status(401).json({error:'Unable to update JWT in user document.'});
    //                             })
    // if (updatePoliceToken) {
    //     // If JWT was successfully updated on a document in the police users collection return the new JWT
    //     return response.status(200).json({token: updatedToken})
    // } else {
    //     // Otherwise return an error
    //     return response.status(400).json({error: 'Unable to update JWT'})
    // } 
}

module.exports = { refreshJWT }