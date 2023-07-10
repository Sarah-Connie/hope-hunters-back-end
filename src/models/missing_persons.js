import mongoose from 'mongoose';


const MissingPersonsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    photoURL: {
        type: String
    },
    age: {
        number: {
            type: Number,
            min: 1,
            max: 110
        },
        type: ['hour', 'hours', 'day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years'],
        required: true,
    },
    dateLastSeen: {
        type: Date,
        default: Date.now()
    },
    currentAge: {
        number: {
            type: Number,
            min: 1,
            max: 110
        },
        type: ['hour', 'hours', 'day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years'],
    },
    areaSuspectedToBe: {
        type: String
    },
    locationLastSeen: {
        address: {
            type: String
        },
        city: {
            type: String
        },
        state: ['NSW', 'QLD', 'VIC', 'TAS', 'WA', 'SA', 'WA', 'NT', 'ACT'],
        postcode: {
            type: String,
            minlength: 4,
            maxlength: 4
        }
    },
    hairColour: {
        type: String
    },
    eyeColour: {
        type: String
    },
    complexion:
        ['sallow', 'fair', 'pale', 'tanned', 'olive', 'freckled', 'ruddy', 'sunburned', 'medium', 'dark', 'unknown'],
    height: {
        number: {
            type: Number,
        },
        measurement: ['centimeters']
    },
    weight: {
        number: {
            type: Number,
        },
        measurement: ['grams', 'kilograms']
    },
    gender: {
        type: String
    },
    distinctiveFeatures: {
        type: String
    },
    amberAlert: {
        type: Boolean,
        default: false
    },
    addedBy:
        [{type: mongoose.Types.ObjectId, ref: 'GeneralUser'}, {type: mongoose.Types.ObjectId, ref: 'PoliceUser'}],
    dateAdded: {
        type: Date,
        default: date.Now()
    }
});

const MissingPerson = mongoose.model('MissingPerson', MissingPersonsSchema);

module.exports = MissingPerson