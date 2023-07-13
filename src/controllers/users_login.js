const { GeneralUser } = require('../models/general_users');
const { PoliceUser } = require('../models/police_users')

const { transporter } = require('../helper_functions/nodemailer_transporter')


const login = async (request, response) => {
    if ((request.body.email).includes('@police.nsw.gov.au')) {
        await PoliceUser.findOne({email: request.body.email}, function(error, user) {
            if (error) {
                response.status(500).json({message: 'Server unable to connect.', error: error.message})
            } else if (!user) {
                response.status(401).json({message: 'User not found.'})
            } else if (request.body.password != user.password) {
                response.status(401).json({message: 'Incorrect password.'})
            } else if (!user.jwt) {
                const emailActivate = {
                    from: "hopehelperes@gmail.com",
                    to: request.body.email,
                    subject: "Verify Email Address - Hope Helpers",
                    text: 'Welcome '+ request.body.stationNameName +',\n\n' + 
                            'Please verify your email address by clicking the link: \nhttp:\/\/' 
                            + request.headers.host + '\/police' + '\/confirmation\/' + request.body.email 
                            + '\n\nThank You!\n' 
                    };
                
                    transporter.sendMail(emailActivate, function (error) {
                        if (error) { 
                            response.status(500).json({error:'Something went wrong. Unable to send email.'});
                        }
                        response.status(200).send('A verification email has been sent to ' + request.body.email + '.');
                    });
            } else {
                try {
                    let url = 'http://' + request.headers.host + '/refresh-token/' + user.jwt
                    const updateToken = fetch(url)
                    response.status(200).json({message: 'Login successful.'});
                } catch (error) {
                    throw new Error(error)
                } 
            }
        })
    } else {
        await GeneralUser.findOne({email: request.body.email}, function(error, user) {
            if (error) {
                response.status(500).json({message: 'Server unable to connect.', error: error.message})
            } else if (!user) {
                response.status(401).json({message: 'User not found.'})
            } else if (request.body.password != user.password) {
                response.status(401).json({message: 'Incorrect password.'})
            } else if (!user.jwt) {
                const emailActivate = {
                    from: "hopehelperes@gmail.com",
                    to: request.body.email,
                    subject: "Verify Email Address - Hope Helpers",
                    text: 'Welcom '+ request.body.stationNameName +',\n\n' + 
                            'Please verify your email address by clicking the link: \nhttp:\/\/' 
                            + request.headers.host + '\/general' + '\/confirmation\/' + request.body.email 
                            + '\n\nThank You!\n' 
                    };
                
                    transporter.sendMail(emailActivate, function (error) {
                        if (error) { 
                            response.status(500).json({error:'Something went wrong. Unable to send email.'});
                        }
                        response.status(200).send('A verification email has been sent to ' + request.body.email + '.');
                    });
            } else {
                try {
                    let url = 'http://' + request.headers.host + '/refresh-token/' + user.jwt
                    const updateToken = fetch(url)
                    response.status(200).json({message: 'Login successful.'});
                } catch (error) {
                    throw new Error(error)
                } 
            }
        })
    }
};


module.exports = { login }