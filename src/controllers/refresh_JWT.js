const { generateJWT, verifyJWT } = require("../helper_functions/JWT_management");

const refreshJWT = async (request, response) => {
    let suppliedToken = decryptString(request.params.token);
    // If no JWT send response with an error message
    if (!suppliedToken) {
        response.status(400).json({error: 'User authorisation could not be verified.'})
    }
    // Verify JWT
    verifyJWT(suppliedToken)

    // Generate a new JWT
    let newToken = generateJWT({email: user.email})

    // Try to find the user document by querying the general users collection with the old token
    let updateGeneralToken = await GeneralUser.findOneAndUpdate({jwt: request.params.token}, {jwt: newToken}, {new: true}) 
                                .catch(error => { 
                                    response.status(401).json({error:'Unable to update JWT in user document.'});
                                })
    if (updateGeneralToken) {
        // If JWT was successfully updated on a document in the general users collection return the new JWT
        response.status(200).send(newToken)
    }
    
    // // Otherwise, try to find the user document by querying the police users collection with the old token
    let updatePoliceToken = await PoliceUser.findOneAndUpdate({jwt: request.params.token}, {jwt: newToken}, {new: true}) 
                                .catch(error => { 
                                    response.status(401).json({error:'Unable to update JWT in user document.'});
                                })
    if (updatePoliceToken) {
        // If JWT was successfully updated on a document in the police users collection return the new JWT
        response.status(200).send(newToken)
    } else {
    // Otherwise return an error
    response.status(400).json({error: 'Unable to update JWT'})
    }

    
}