const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('missing/new allows a verified user to add a new document to the missingpersons collection', () => {
	test("Route returns a new document formatted as JSON when all inputs correct for a general user", async () => {
		const response = await request(app)
                                .post('/missing/new')
                                .send({
                                    fullName: "Duncan W",
                                    photoURL: "https://www.shutterstock.com/image-photo/real-looking-healthy-guy-smiling-600w-1571622880.jpg",
                                    ageNumber: 32,
                                    ageType: "years",
                                    currentAgeNumber: 32,
                                    currentAgeType: "years",
                                    areaSuspectedToBe: "Coogee",
                                    address: "24 Carr St",
                                    city: "Coogee",
                                    state: "NSW",
                                    postcode: "2034",
                                    hairColour: "Brown",
                                    eyeColour: "Brown",
                                    complexion: "fair",
                                    heightNumber: 165,
                                    heightMeasurement: "centimeters",
                                    weightNumber: 125,
                                    weightMeasurement: "kilograms",
                                    gender: "male",
                                    distinctiveFeatures: "none",
                                    amberAlert: false
								})
                                // Bearer token for verified user Peter R
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f63dd935462363664fc8e03c2bea82c7549f0247c573c89b0ea894dfe2b8574861beaf4c32a7455f28f7f2ab65fcd908ecac4585634ca894ea3b4c62b605d6b90d'});
		expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
	});
    test("Route returns a new document formatted as JSON when all inputs correct for a police user", async () => {
		const response = await request(app)
                                .post('/missing/new')
                                .send({
                                    fullName: "Duncan W",
                                    photoURL: "https://www.shutterstock.com/image-photo/real-looking-healthy-guy-smiling-600w-1571622880.jpg",
                                    ageNumber: 32,
                                    ageType: "years",
                                    currentAgeNumber: 32,
                                    currentAgeType: "years",
                                    areaSuspectedToBe: "Coogee",
                                    address: "24 Carr St",
                                    city: "Coogee",
                                    state: "NSW",
                                    postcode: "2034",
                                    hairColour: "Brown",
                                    eyeColour: "Brown",
                                    complexion: "fair",
                                    heightNumber: 165,
                                    heightMeasurement: "centimeters",
                                    weightNumber: 125,
                                    weightMeasurement: "kilograms",
                                    gender: "male",
                                    distinctiveFeatures: "none",
                                    amberAlert: false
								})
                                // Bearer token for verified user Sawtell Police Station
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233178559778e103d219059b52665e2310e6b2760a8d34aee96cac4b5bc88b7ca5a30df1889b634cde6fd898fd2bbbb4775b3330a431f123ba45817581d10e70277781a5c3da1acccc86b708a3e525cc80183b0c4d5945e1767a05cf12131b11526eac39bfd474258794a02a0677641939b'});
		expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
	});
    test("Route returns error for invalid JWT in custom header", async () => {
		const response = await request(app)
                                .post('/missing/new')
                                .send({
                                    fullName: "Duncan W",
                                    photoURL: "https://www.shutterstock.com/image-photo/real-looking-healthy-guy-smiling-600w-1571622880.jpg",
                                    ageNumber: 32,
                                    ageType: "years",
                                    currentAgeNumber: 32,
                                    currentAgeType: "years",
                                    areaSuspectedToBe: "Coogee",
                                    address: "24 Carr St",
                                    city: "Coogee",
                                    state: "NSW",
                                    postcode: "2034",
                                    hairColour: "Brown",
                                    eyeColour: "Brown",
                                    complexion: "fair",
                                    heightNumber: 165,
                                    heightMeasurement: "centimeters",
                                    weightNumber: 125,
                                    weightMeasurement: "kilograms",
                                    gender: "male",
                                    distinctiveFeatures: "none",
                                    amberAlert: false
                                })
                                // Bearer token for verified user Peter R
                                .set({'authorization': 'Bearer 8b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f63dd935462363664fc8e03c2bea82c7549f0247c573c89b0ea894dfe2b8574861beaf4c32a7455f28f7f2ab65fcd908ecac4585634ca894ea3b4c62b605d6b90d'});
        expect(response.body.error).toBe('User authorisation could not be verified.');
        expect(response.statusCode).toEqual(401);
	});
    test("Route returns the newly corrected document", async () => {
		const response = await request(app)
                                .post('/missing/new')
                                .send({
                                    fullName: "Duncan W",
                                    photoURL: "https://www.shutterstock.com/image-photo/real-looking-healthy-guy-smiling-600w-1571622880.jpg",
                                    ageNumber: 32,
                                    ageType: "years",
                                    currentAgeNumber: 32,
                                    currentAgeType: "years",
                                    areaSuspectedToBe: "Coogee",
                                    address: "24 Carr St",
                                    city: "Coogee",
                                    state: "NSW",
                                    postcode: "2034",
                                    hairColour: "Brown",
                                    eyeColour: "Brown",
                                    complexion: "fair",
                                    heightNumber: 165,
                                    heightMeasurement: "centimeters",
                                    weightNumber: 125,
                                    weightMeasurement: "kilograms",
                                    gender: "male",
                                    distinctiveFeatures: "none",
                                    amberAlert: false
                                })
                                // Bearer token for verified user Peter R
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f63dd935462363664fc8e03c2bea82c7549f0247c573c89b0ea894dfe2b8574861beaf4c32a7455f28f7f2ab65fcd908ecac4585634ca894ea3b4c62b605d6b90d'});
        expect(response.body).toHaveProperty('fullName');
        expect(response.body.fullName).toBe('Duncan W');
        expect(response.body).toHaveProperty('age');
        expect(typeof(response.body.age)).toBe('object');
        expect(response.body).toHaveProperty('gender');
        expect(response.body.gender).toBe('male');
	});

    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});