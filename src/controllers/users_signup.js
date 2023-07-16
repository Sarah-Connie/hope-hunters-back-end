const { GeneralUser } = require('../models/general_users');
const { PoliceUser } = require('../models/police_users');


const { transporter } = require('../helper_functions/nodemailer_transporter');

const { encryptString } = require('../helper_functions/cryptography_management');


const signup = async (request, response) => {
    // Search generalusers collection with the provided email address
    if (request.body.fullName) {
        let newUser = await GeneralUser.findOne({email: request.body.email})
                                .catch(error => {response.status(404).json({error: 'Unable access collection.'})});
        
        // If user already exists in collection return message to login
        if (newUser) {
            return response.status(400).json({message:'Email address is already associated with an account. Please login.'})
        // Otherwise add new user
        } else {
            let newGeneralUser = new GeneralUser({
                fullName: request.body.fullName,
                email: request.body.email,
                password: encryptString(request.body.password),
                admin: request.body.admin
            });

            // Return elegant error message if password not in request.body as encryption will throw an error 
            if (!request.body.password) {
                return response.status(400).json({error:'Password missing.'})
            }
        
            // Save new user
            await newGeneralUser.save()
                .catch(error => {
                    return response.status(404).json({error: "Unable to save new user."})
            })
        
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
        }
    // Search police users collection with the provided email address
    } else if (request.body.stationName) {
        let newUser = await PoliceUser.findOne({email: request.body.email})
                                .catch(error => {response.status(404).json({error: 'Unable access collection.'})});
        
        // If user already exists in collection return message to login
        if (newUser) {
            return response.status(400).json({message:'Email address is already associated with an account. Please login.'})
        // Otherwise add new user
        } else {
            let PoliceUser = new PoliceUser({
                stationName: request.body.stationName,
                policeAreaCommand: request.body.policeAreaCommand,
                policeDistrict: request.body.policeDistrict,
                email: request.body.email,
                password: encryptString(request.body.password)
            });

            // Return elegant error message if password not in request.body as encryption will throw an error
            if (!request.body.password) {
                return response.status(400).json({error:'Password missing.'})
            }
        
            // Save new user
            await newPoliceUser.save()
                .catch(error => {
                    return response.status(404).json({error: "Unable to save new user."})
            })
        
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
        }
    // Return an elegant error message if required fields are missing from request.body
    } else {
        return response.status(400).json({error:'Request missing required field/s.'});
    }
}

module.exports = { signup }