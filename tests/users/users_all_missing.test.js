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
                                // Token belongs to police user Sawtell Police Station
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233178559778e103d219059b52665e2310e6b2760a8d34aee96cac4b5bc88b7ca5a30df1889b634cde6fd898fd2bbbb4775107f91b9b4df4debd7864f702c0f1875c8af0a142bb89be3aee48d86042d88d19c85710e72de62db8f23b5f41e2c38baed70d51574b549c4e6ce70df39e12916'});
        expect(response.statusCode).toEqual(200);
        expect(response.body).toStrictEqual([]);
	});


    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});