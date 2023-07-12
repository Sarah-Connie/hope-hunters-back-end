const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth:{
            api_key: process.env.SENDGRID_API_KEY
        }
    })
);

module.exports = transporter