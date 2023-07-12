const { PoliceUser } = require('../models/police_users');


const policeUsersConfirmation = async (request, response, next) => {
    const jwtoken = crypto.randomBytes(16).toString('hex')
    const expiry = Date.now() + 7

    let addJWT = await PoliceUser.findOneAndUpdate(request.param.email, {jwt: {jwtoken, expiry}}, {new: true})
                    .catch(error => { 
                        response.status(401).json({error:'Unable to verify user.'});
                    }) 
    
    if (addJWT) {
        response.status(200).send(addJWT)
    } else {
        response.status(400).json({error: 'User account could not be verified'})
    }
};


exports.module = { policeUsersConfirmation }