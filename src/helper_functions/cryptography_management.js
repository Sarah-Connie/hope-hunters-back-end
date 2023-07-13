const dotenv = require('dotenv');
dotenv.config();

const crypto = require('crypto');
let encAlgorithm = 'aes-256-cbc';
let encPrivateKey = crypto.scryptSync(process.env.ENC_KEY, process.env.SECRET_SALT, 32);
let encIV = crypto.scryptSync(process.env.ENC_IV, process.env.SECRET_SALT, 16);
let cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV);
let decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV);

// Encrypt a plaintext string
function encryptString(data){
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

// Decrypt an encoded string to a plaintext string
function decryptString(data){
    return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
}

module.exports = {
    encryptString,
    decryptString
}