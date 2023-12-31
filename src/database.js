const { GeneralUser } = require('./models/general_users');
const { PoliceUser } = require('./models/police_users');
const { MissingPerson } = require('./models/missing_persons');

const { encryptString } = require('./helper_functions/cryptography_management');
const { generateJWT } = require('./helper_functions/JWT_management');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');


// Define database connector function. Takes databaseURL variable as a parameter to determine
// the appropriate url for the database for the environment
async function databaseConnector(databaseURL) {
    try {
        await mongoose.connect(databaseURL, {useNewUrlParser: true, useUnifiedTopology: true})
    } catch (error) {
        console.log(error);
    }
}

let password = encryptString('password1234')

// Data to be seeded into generalusers collection
const seedGeneralUsers = [
    {
        fullName: 'Peter R',
        email: 'peter@email.com',
        password: password,
        jwt: encryptString(jwt.sign({email: 'peter@email.com'}, process.env.JWT_SECRET))
    },
    {
        fullName: 'Julia A',
        email: 'julia@email.com',
        password: password
    },
    {
        fullName: 'Steve M',
        email: 'steve@email.com',
        password: password,
        jwt: encryptString(jwt.sign({email: 'steve@email.com'}, process.env.JWT_SECRET))
    },
    {
        fullName: 'Ken W',
        email: 'ken@email.com',
        password: password,
        jwt: encryptString(jwt.sign({email: 'ken@email.com'}, process.env.JWT_SECRET))
    },
    {
        fullName: 'Megan C',
        email: 'megan@email.com',
        password: password,
        admin: true,
        jwt: encryptString(jwt.sign({email: 'megan@email.com'}, process.env.JWT_SECRET))
    },
]

// Data to be seeded into policeusers collection
const seedPoliceUsers = [
    {
        stationName: 'Albany Police Station',
        policeAreaCommand: 'Southern Region',
        policeDistrict: 'Murray River',
        email: 'albanytest@police.nsw.gov.au',
        password: password
    },
    {
        stationName: 'Sawtell Police Station',
        policeAreaCommand: 'Northern Region',
        policeDistrict: 'Coffs Clarence',
        email: 'sawtelltest@police.nsw.gov.au',
        password: password,
        jwt: encryptString(jwt.sign({email: 'sawtelltest@police.nsw.gov.au'}, process.env.JWT_SECRET))
    }
]

// Data to be seeded into missingpersons collection
const seedMissingPersons = [
    {
        fullName: 'Keira Janssen',
        photoURL: 'https://media.istockphoto.com/id/1326417862/photo/young-woman-laughing-while-relaxing-at-home.jpg?s=1024x1024&w=is&k=20&c=Gb9C49IRPKG88Jahy5-QgyD34G9OEPwtBpr9LwT3KUw=',
        age: {
            number: 28,
            type: 'years'
        },
        dateLastSeen: (new Date().setDate(new Date().getDate() - 2)),
        currentAge: {
            number: 28,
            type: 'years'
        },
        areaSuspectedToBe: 'Mount Foster',
        locationLastSeen: {
            address: '84 Arthur Street',
            city: 'Mount Foster',
            state: 'NSW',
            postcode: '2824'
        },
        hairColour: 'brown',
        eyeColour: 'brown',
        complexion: 'fair',
        height: {
            number: 165,
            measurement: 'centimeters'
        },
        weight: {
            number: 75,
            measurement: 'kilograms'
        },
        gender: 'female',
        distinctiveFeatures: 'flower tattoo left shoulder',
        dateAdded: (new Date().setDate(new Date().getDate() - 2))
    },
    {
        fullName: 'Bethany Reading',
        photoURL: 'https://media.istockphoto.com/id/1072792764/photo/positive-living.jpg?s=1024x1024&w=is&k=20&c=BLmPOpZDkFl_p9YVJddPGuFb2IF8pfGqpWYIps6XkeU=',
        age: {
            number: 55,
            type: 'years'
        },
        dateLastSeen: (new Date().setDate(new Date().getDate() - 665)),
        currentAge: {
            number: 57,
            type: 'years'
        },
        areaSuspectedToBe: 'Campbelltown',
        locationLastSeen: {
            address: '60 Timms Drive',
            city: 'Campbelltown',
            state: 'NSW',
            postcode: '2560'
        },
        hairColour: 'Black',
        eyeColour: 'Brown',
        complexion: 'dark',
        height: {
            number: 162,
            measurement: 'centimeters'
        },
        weight: {
            number: 95,
            measurement: 'kilograms'
        },
        gender: 'female',
        distinctiveFeatures: 'glasses in black frame',
        dateAdded: (new Date().setDate(new Date().getDate() - 35))
    },
    {
        fullName: 'Austin Bond',
        photoURL: 'https://media.istockphoto.com/id/1193994027/photo/cute-boy-outdoors.jpg?s=1024x1024&w=is&k=20&c=8RAROvPoxvPEX4hhBWT7FvHar8YQPy7u5-sVVPITWpE=',
        age: {
            number: 20,
            type: 'months'
        },
        dateLastSeen: Date.now(),
        currentAge: {
            number: 20,
            type: 'months'
        },
        areaSuspectedToBe: 'Yamba',
        locationLastSeen: {
            address: '52 Oak Street',
            city: 'Gulmarrad',
            state: 'NSW',
            postcode: '2463'
        },
        hairColour: 'Brown',
        eyeColour: 'Brown',
        complexion: 'medium',
        height: {
            number: 80,
            measurement: 'centimeters'
        },
        weight: {
            number: 12,
            measurement: 'kilograms'
        },
        gender: 'male',
        amberAlert: true,
    },
    {
        fullName: 'Hsin Chien',
        photoURL: 'https://media.istockphoto.com/id/1311977362/photo/mid-age-chinese-ethnicity-man-in-the-park.jpg?s=1024x1024&w=is&k=20&c=O40M0_ulZQzi4BUgC6BmWpR5l7fkRRxauMH_CYml8CE=',
        age: {
            number: 81,
            type: 'years'
        },
        dateLastSeen: (new Date().setDate(new Date().getDate() - 7)),
        currentAge: {
            number: 81,
            type: 'years'
        },
        areaSuspectedToBe: 'Bankstown, Padstow',
        locationLastSeen: {
            address: '488 Old Northern Road',
            city: 'Bankstown',
            state: 'NSW',
            postcode: '2200'
        },
        hairColour: 'Grey',
        eyeColour: 'brown',
        complexion: 'olive',
        height: {
            number: 177,
            measurement: 'centimeters'
        },
        weight: {
            number: 84,
            measurement: 'kilograms'
        },
        gender: 'male',
        distinctiveFeatures: 'large scar on back of right hand',
    }
]

// Function to seed above data into the database
async function seedDatabase(databaseURL) {
    await mongoose.connect(databaseURL)
    await GeneralUser.deleteMany({});
    await GeneralUser.insertMany(seedGeneralUsers);
    await PoliceUser.deleteMany({});
    await PoliceUser.insertMany(seedPoliceUsers);
    await MissingPerson.deleteMany({});
    await MissingPerson.insertMany(seedMissingPersons)
    await mongoose.connection.close()
}

// Function to close an established database connection
async function databaseDisconnector() {
    try {
        await mongoose.connection.close()
    } catch (error) {
        console.log(error);
    } 
}

module.exports = {
    databaseConnector, 
    seedDatabase,
    databaseDisconnector
}