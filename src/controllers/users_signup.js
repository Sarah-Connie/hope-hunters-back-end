const { GeneralUser } = require('../models/general_users');
const { PoliceUser } = require('../models/police_users')


const { transporter } = require('../helper_functions/nodemailer_transporter')


const signup = async (request, response) => {
    if (request.body.fullName) {
        await GeneralUser.findOne({email: request.body.email}, function(error, user) {
            if (error) {
                response.status(500).json({message: 'Server unable to connect.', error: error.message})
            } else if (user) {
                response.status(400).json({message:'Email address is already associated with an account. Please login'});
            } else {
                let newGeneralUser = new GeneralUser({
                    fullName: request.body.fullName,
                    email: request.body.email,
                    password: encryptString(request.body.password),
                    admin: request.body.admin
                })
    
                newGeneralUser.save()
                    .catch(error => {
                        response.status(500).json({error: error.message})
                })
    
                const emailActivate = {
                    from: "hopehelperes@gmail.com",
                    to: request.body.email,
                    subject: "Verify Email Address - Hope Helpers",
                    text: 'Hello '+ request.body.fullName +',\n\n' + 
                            'Please verify your email address by clicking the link: \nhttp:\/\/' 
                            + request.headers.host + '\/general' + '\/confirmation\/' + request.body.email 
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
    } else if (request.body.stationName) {
        await PoliceUser.findOne({email: request.body.email}, function(error, user) {
            if (error) {
                response.status(500).json({message: 'Server unable to connect.', error: error.message})
            } else if (user) {
                response.status(400).json({message:'Email address is already associated with an account. Please login'});
            } else {
                let PoliceUser = new PoliceUser({
                    stationName: request.body.stationName,
                    policeAreaCommand: request.body.policeAreaCommand,
                    policeDistrict: request.body.policeDistrict,
                    email: request.body.email,
                    password: encryptString(request.body.password)
                })
    
                newPoliceUser.save()
                    .catch(error => {
                        response.status(500).json({error: error.message})
                })

                const emailActivate = {
                    from: "hopehelperes@gmail.com",
                    to: request.body.email,
                    subject: "Verify Email Address - Hope Helpers",
                    text: 'Welcom '+ request.body.stationNameName +',\n\n' + 
                            'Please verify your email address by clicking the link: \nhttp:\/\/' 
                            + request.headers.host + '\/police' + '\/confirmation\/' + request.body.email 
                            + '\n\nThank You!\n' 
                    };
                    
                transporter.sendMail(emailActivate, function (error) {
                    if (error) { 
                        response.status(500).json({error:'Something went wrong. Unable to send email.'});
                    }
                    response.status(200).send('A verification email has been sent to ' + user.email + '.');
                });
    
                response.send(newPoliceUser)
            }
        }) 
    } else {
        response.status(400).json({error: 'Something went wrong. Unable to sign up new user.'})
    }   
};


module.exports = { signup }