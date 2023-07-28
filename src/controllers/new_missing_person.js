const { MissingPerson } = require('../models/missing_persons');


const addMissingPerson = async (request, response) => {
    // Define how to populate fields in a new document in the missingpersons collection
    let newMissingPerson = new MissingPerson({
        fullName: request.body.fullName,
        photoURL: request.body.photoURL,
        age: {
            number: request.body.ageNumber,
            type: request.body.ageType
        },
        dateLastSeen: request.body.dateLastSeen,
        currentAge: {
            number: request.body.currentAgeNumber,
            type: request.body.currentAgeType
        },
        areaSuspectedToBe: request.body.areaSuspectedToBe,
        locationLastSeen: {
            address: request.body.address,
            city: request.body.city,
            state: request.body.state,
            postcode: request.body.postcode
        },
        hairColour: request.body.hairColour,
        eyeColour: request.body.eyeColour,
        complexion: request.body.complexion,
        height: {
            number: request.body.heightNumber,
            measurement: request.body.heightMeasurement
        },
        weight: {
            number: request.body.weightNumber,
            measurement: request.body.weightMeasurement
        },
        gender: request.body.gender,
        distinctiveFeatures: request.body.distinctiveFeatures,
        amberAlert: request.body.amberAlert,
        dateAdded: request.body.dateAdded,
        // Attach the user to the document with the _id obtained in the getUserStatus middleware
        addedBy: request.userID,
        // Attach the police district to the document with the details obtained in the getUserStatus middleware
        policeDistrict: request.district
    });

    
    // Save new missing person
    await newMissingPerson.save()
        .catch(error => {
            // Return an error message is unable to save the new document
            return response.status(400).json({error: "Unable to save new missing person."})
    })
    
    // Return the new document if save successfully
    return response.status(200).send(newMissingPerson);
}

module.exports = { addMissingPerson }