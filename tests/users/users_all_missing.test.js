const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('users/missing/all route returns all documents in missingpersons collection belonging to the user', () => {
	test("Route returns documents belonging to the user. Documents are formatted as JSON", async () => {
        const newMissingPerson = await request(app)
                                .post('/missing/new')
                                .send({
                                    fullName: "Fiona Kirby",
                                    ageNumber: 17,
                                    ageType: "years",
                                    areaSuspectedToBe: "Sydney",
                                    hairColour: "blonde",
                                    eyeColour: "blue",
                                    complexion: "fair",
                                    heightNumber: 158,
                                    heightMeasurement: "centimeters",
                                    weightNumber: 68,
                                    weightMeasurement: "kilograms",
                                    gender: "female",
                                    distinctiveFeatures: "glasses",
                                    amberAlert: false
                                })
                                // Token belongs to verified user Steve M
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f6e9a0cc2e71eddaeccbae18de604f0cc7f572746abfc8e47653aae175544c26cf16aa09b44ea3bbe6c6c72f2c88da978a859e43c1059ff02ae92396deba087042'});
        const owner = newMissingPerson.body.addedBy
		const response = await request(app)
                                .get('/users/missing/all')
                                // Token belongs to verified user Steve M
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f6e9a0cc2e71eddaeccbae18de604f0cc7f572746abfc8e47653aae175544c26cf16aa09b44ea3bbe6c6c72f2c88da978a859e43c1059ff02ae92396deba087042'});
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
        expect(response.body[0]).toHaveProperty('fullName');
        expect(response.body[0].fullName).toBe('Fiona Kirby');
        expect(response.body[0].addedBy).toEqual(owner);
	});
    test("Route returns an empty array if no matching documents exist", async () => {
		const response = await request(app)
                                .get('/users/missing/all')
                                // Token belongs to verified user Steve M
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d92337326295595780f6f4478c0a3c1c78b43f4015f3f02995b8832310a0836ed15a46b7a63ab6c803bc3b4993d3f871e40eeffb6e1e44d956d698d02872b2e5a746181881e7bc8e353c3e5a520daf26876fdc56822960d8a62bff6ae4769a88d36a1'});
        expect(response.statusCode).toEqual(200);
        expect(response.body).toStrictEqual([]);
	});


    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});