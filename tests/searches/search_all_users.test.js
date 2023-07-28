const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('missing/search/:search route returns matching documents in missingpersons collection of a fuzzy search', () => {
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
                                .get('/missing/users/search/Fiona')
                                // Token belongs to verified user Steve M
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f6e9a0cc2e71eddaeccbae18de604f0cc7f572746abfc8e47653aae175544c26cf16aa09b44ea3bbe6c6c72f2c88da978a859e43c1059ff02ae92396deba087042'});
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
        expect(response.body[0]).toHaveProperty('fullName');
        expect(response.body[0].fullName).toBe('Fiona Kirby');
        expect(response.body[0].addedBy).toEqual(owner);
	});
    test("Route returns matching documents. Search parameter 17 should return one document with currentAge of 17 years", async () => {
		const response = await request(app)
                                .get('/missing/users/search/17')
                                // Token belongs to verified user Steve M
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f6e9a0cc2e71eddaeccbae18de604f0cc7f572746abfc8e47653aae175544c26cf16aa09b44ea3bbe6c6c72f2c88da978a859e43c1059ff02ae92396deba087042'});
        expect(response.body[0]).toHaveProperty('age');
        expect(response.body[0].age).toMatchObject(expect.objectContaining([{number: 17, type: 'years'}]));
	});
  test("Route returns matching documents. Search parameter 2021 should return one document with the year of the dateLastSeen field being 2021", async () => {
		const newMissingPerson = await request(app)
                                .post('/missing/new')
                                .send({
                                    fullName: "Sam Smith",
                                    ageNumber: 12,
                                    ageType: "years",
                                    dateLastSeen: (new Date().setDate(new Date().getDate() - 665)),
                                    amberAlert: true
                                })
                                // Token belongs to police user Sawtell Police Station
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233178559778e103d219059b52665e2310e6b2760a8d34aee96cac4b5bc88b7ca5a30df1889b634cde6fd898fd2bbbb4775288c75b73e3f84962b81d900ce27de5c51d4ef4f33d31dc72238fa79e8fee4be8906b072612bcf06111ac229f36dce43501a2c16f352c0dfb5bbd3e8576180f7'});
    const response = await request(app).get('/missing/users/search/2021')
                              // Token belongs to police user Sawtell Police Station
                              .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233178559778e103d219059b52665e2310e6b2760a8d34aee96cac4b5bc88b7ca5a30df1889b634cde6fd898fd2bbbb4775288c75b73e3f84962b81d900ce27de5c51d4ef4f33d31dc72238fa79e8fee4be8906b072612bcf06111ac229f36dce43501a2c16f352c0dfb5bbd3e8576180f7'});
        const dateExpectedRaw = (new Date().setDate(new Date().getDate() - 665));
        let dateReceived = (new Date(response.body[0].dateLastSeen)).toISOString().split('T')[0]
        let dateExpected = (new Date(dateExpectedRaw)).toISOString().split('T')[0]
        expect(response.body[0]).toHaveProperty('dateLastSeen');
        expect(dateReceived).toBe(dateExpected);
        expect(response.body[0]).not.toHaveProperty('error');
	});
  test("Route returns an empty array if no matching documents exist", async () => {
		const response = await request(app)
                                .get('/missing/users/search/Jessica')
                                // Token belongs to verified user Steve M
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f6e9a0cc2e71eddaeccbae18de604f0cc7f572746abfc8e47653aae175544c26cf16aa09b44ea3bbe6c6c72f2c88da978a859e43c1059ff02ae92396deba087042'});
        expect(response.statusCode).toEqual(200);
        expect(response.body).toStrictEqual([]);
	});
  test("Route returns an empty array if a user searches for a document they do not own. No error to be returned.", async () => {
		const response = await request(app)
                                    .get('/missing/users/search/Fiona')
                                    // Token belongs to verified user Megan C
                                    .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233ca19f38f97432cf88b7569cae2bdf7b52544651ec0f1fedacf9822f9c7981568560043c2864ae49fb3aba11cba67917542a26be8015cf09890a90e829868985084e0d5410fc0ed773d559e9aea10e2982b732309a6b6272db81e8035d3e4b930'});
        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Unable to find user document.');
	});

  afterAll(done => {
      // Close database connection after testing finished
      mongoose.connection.close();
      done();
    });
});