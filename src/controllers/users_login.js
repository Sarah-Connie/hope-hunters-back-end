const { GeneralUser } = require('../models/general_users');
const { PoliceUser } = require('../models/police_users');

const { transporter } = require('../helper_functions/nodemailer_transporter');

const { decryptString } = require('../helper_functions/cryptography_management');


const login = async (request, response) => {
    // Identify if user is trying to login in as a police or general user by checking the supplied email address
    // If true, user is a police user
    if ((request.body.email).includes('@police.nsw.gov.au')) {
        // Search policeusers collection with the provided email address
        let user = await PoliceUser.findOne({email: request.body.email})
                            .catch(error => {response.status(404).json({error: 'Unable access collection.'})});

        // If the user is not found, email address must be incorrect or invalid
        if (!user) {
            return response.status(400).json({error: 'Incorrect email address.'})
        // Check that supplied password matches the password stored in the database
        } else if (request.body.password != decryptString(user.password)) {
            return response.status(400).json({error: 'Incorrect password.'})
        // Check user document contains a JWT. If not, user has not verified their email address. Send new verification link to the supplied email address.
        } else if (!user.jwt) {
            // Set up verification email details for nodemailer/sendgrid
            const emailActivate = {
                from: "hopehelpersaus@gmail.com",
                to: request.body.email,
                subject: "Verify Email Address - Hope Helpers",
                text: `Hello `+ request.body.fullName + `,\n\n` + 
                        `Please verify your email address by clicking the link: \nhttp:\/\/` 
                        + request.headers.host + `\/police` + `\/confirmation\/` + request.body.email 
                        + `\n\nThank You!\n` 
                };
                 
            // Call nodemailer to send verification email to provided address
            transporter.sendMail(emailActivate, function (error, result) {
                if (error) { 
                    console.log(error)
                    return response.status(400).json({error:'Something went wrong. Unable to send email.'});
                } else {
                    console.log(result)
                    return response.status(200).json({message: 'A verification email has been sent to ' + request.body.email + '.'});
                }
            });
        // If validations above pass, login the user and add the jwt to the response.body
        } else {
            return response.status(200).json({message: 'Login successful.', token: user.jwt, police: true, admin: false});
        }
    } else {
        // Search generalusers collection with the provided email address
        let user = await GeneralUser.findOne({email: request.body.email})
                            .catch(error => {response.status(404).json({error: 'Unable access collection.'})});

        // If the user is not found, email address must be incorrect or invalid
        if (!user) {
            return response.status(400).json({error: 'Incorrect email address.'})
        // Check that supplied password matches the password stored in the database
        } else if (request.body.password != decryptString(user.password)) {
            return response.status(400).json({error: 'Incorrect password.'})
        // Check user document contains a JWT. If not, user has not verified their email address. Send new verification link to the supplied email address.
        } else if (!user.jwt) {
            // Set up verification email details for nodemailer/sendgrid
            const emailActivate = {
                from: "hopehelpersaus@gmail.com",
                to: request.body.email,
                subject: "Verify Email Address - Hope Helpers",
                text: `Hello `+ request.body.fullName + `,\n\n` + 
                        `Please verify your email address by clicking the link: \nhttp:\/\/` 
                        + request.headers.host + `\/general` + `\/confirmation\/` + request.body.email 
                        + `\n\nThank You!\n` 
            };
     
            // Call nodemailer to send verification email to provided address
            transporter.sendMail(emailActivate, function (error, result) {
                if (error) { 
                    console.log(error)
                    return response.status(400).json({error:'Something went wrong. Unable to send email.'});
                } else {
                    console.log(result)
                    return response.status(200).json({message: 'A verification email has been sent to ' + request.body.email + '.'});
                }
            });
        // If validations above pass, login the user and add the jwt to the response.body
        } else {
            return response.status(200).json({message: 'Login successful.', token: user.jwt, admin: user.admin, police: false});
        }
    }
};


module.exports = { login }