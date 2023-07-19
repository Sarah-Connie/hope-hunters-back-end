const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


// Generate a JWT with the an email address. Access secret in an environmental variable. Set expiry for 7 days.
function generateJWT(userDetails) {
    return jwt.sign({email: userDetails}, process.env.JWT_SECRET, {expiresIn: '7d'});
}

// Verify a provided JWT is valid with the secret stored in an environmental variable.
function verifyJWT(JWT) {
    try{
        return jwt.verify(JWT, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid JWT.")
    }
}

module.exports = {
    generateJWT,
    verifyJWT
}