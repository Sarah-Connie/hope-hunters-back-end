const { decryptString } = require('../helper_functions/cryptography_management');
const { verifyJWT } = require('../helper_functions/JWT_management');


const dotenv = require('dotenv');
dotenv.config();


const validateRequest = (request, response, next) => {
    // Get JWT from request header and decrypt it
    let suppliedToken = decryptString(request.headers.authorization.split(" ")[1]);

    try {
        // If no JWT send response with an error message
        if (!suppliedToken) {
            response.status(400).json({error: 'User authorisation could not be verified.'})
        }
        // Verify JWT
        verifyJWT(suppliedToken);
        // If no errors call next()
        return next(suppliedToken.email);
    } catch (error) {
        next(error);
    }
}