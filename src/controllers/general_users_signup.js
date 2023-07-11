const { GeneralUser } = require('../models/general_users');

const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth:{
            api_key: process.env.SENDGRID_API_KEY
        }
    })
);


const generalUsersSignup = async (request, response, next) => {
    await GeneralUser.findOne({email: request.body.email}, function(error, user) {
        if (error) {
            response.status(500).json({message: 'Server unable to connect.', error: error.message})
        } else if (user) {
            response.status(400).json({message:'Email address is already associated with an account. Please login'});
        } else {
            let newGeneralUser = new GeneralUser({
                fullName: request.body.fullName,
                email: request.body.email,
                password: request.body.password,
                admin: request.body.admin
            })

            newGeneralUser.save()
                .catch(error => {
                    response.status(500).json({error: error.message})
            })

            const emailActivate = {
                from: "hopehelperes@gmail.com",
                to: user.email,
                subject: "Verify Email Address - Hope Helpers",
                text: 'Hello '+ request.body.fullName +',\n\n' + 
                        'Please verify your email address by clicking the link: \nhttp:\/\/' 
                        + request.headers.host + '\/confirmation\/' + request.body.email 
                        + '\n\nThank You!\n' 
                };
            
            transporter.sendMail(emailActivate, function (error) {
                if (error) { 
                    response.status(500).json({error:'Something went wrong. Unable to send email.'});
                }
                response.status(200).send('A verification email has been sent to ' + user.email + '.');
            });

            response.send(newGeneralUser)

        }
    })  
};


module.exports = { generalUsersSignup }