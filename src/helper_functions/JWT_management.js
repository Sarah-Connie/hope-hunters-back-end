const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


function generateJWT(userDetails) {
    return jwt.sign({email: userDetails}, process.env.JWT_SECRET, {expiresIn: '7d'});
}

function verifyJWT(JWT) {
    try{
        return jwt.verify(JWT, process.env.JWT_SECRET_KEY);
    } catch (error) {
        throw new Error("Invalid JWT.")
    }
}

module.exports = {
    generateJWT,
    verifyJWT
}