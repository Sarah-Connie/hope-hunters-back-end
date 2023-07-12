const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


function generateJWT(userDetails) {
    return jwt.sign(userDetails, process.env.JWT_SECRET);
}

function verifyJWT(JWT) {
    try{
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        throw new Error("Invalid JWT.")
    }
}

module.exports = {
    generateJWT,
    verifyJWT
}