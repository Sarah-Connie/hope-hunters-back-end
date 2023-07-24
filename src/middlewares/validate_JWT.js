const { decryptString } = require('../helper_functions/cryptography_management');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


const validateRequest = (request, response, next) => {
    // Get JWT from request header and decrypt it
    let suppliedToken = decryptString(request.headers.authorization.split(" ")[1]);

    // If no JWT send response with an error message
    if (!suppliedToken) {
        return response.status(401).json({error: 'User authorisation could not be verified.'})
    }
    // Verify JWT and attached email address from token to request.body
    jwt.verify(suppliedToken, process.env.JWT_SECRET, (error, decodedJWT) => {
        if (error) {
            response.status(401).json({error: 'User authorisation could not be verified.'});
        }

        request.user = decodedJWT.email;
    });

    // If no errors call next()
    next();
}

module.exports = { validateRequest }