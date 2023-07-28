const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('missing/search/:search route returns matching documents in missingpersons collection of a fuzzy search', () => {
	test("Route returns documents formatted as JSON", async () => {
		const response = await request(app).get('/missing/search/Austin');
		expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
	});
    test("Route returns matching documents. Search parameter Austin should return one document with fullName containing 'Austin'", async () => {
		const response = await request(app).get('/missing/search/Austin');
        expect((response.body).length).toEqual(1);
        expect(response.body[0]).toHaveProperty('fullName');
        expect(response.body[0].fullName).toBe('Austin Bond');
	});
    test("Route returns matching documents. Search parameter Austin should return one document with fullName containing 'Austin'", async () => {
		const response = await request(app).get('/missing/search/Yamba');
        expect(response.body[0]).toHaveProperty('areaSuspectedToBe');
        expect(response.body[0].areaSuspectedToBe).toBe('Yamba');
	});
    test("Route returns matching documents. Search parameter 57 should return one document with currentAge of 57 years", async () => {
		const response = await request(app).get('/missing/search/57');
        expect(response.body[0]).toHaveProperty('currentAge');
        expect(response.body[0].currentAge).toMatchObject(expect.objectContaining([{number: 57, type: 'years'}]));
        expect(response.body[0]).not.toHaveProperty('token');
	});
    test("Route returns matching documents. Search parameter 2021 should return one document with the year of the dateLastSeen field being 2021", async () => {
		const response = await request(app).get('/missing/search/2021');
        const dateExpectedRaw = (new Date().setDate(new Date().getDate() - 665));
        let dateReceived = (new Date(response.body[0].dateLastSeen)).toISOString().split('T')[0]
        let dateExpected = (new Date(dateExpectedRaw)).toISOString().split('T')[0]
        expect(response.body[0]).toHaveProperty('dateLastSeen');
        expect(dateReceived).toBe(dateExpected);
        expect(response.body[0]).not.toHaveProperty('error');
	});
    test("Route returns objects sorted in descending order for the dateAdded field", async () => {
		const response = await request(app).get('/missing/search/male');
        const oldest = new Date(response.body[1].dateAdded).getTime()
        const newest = new Date(response.body[0].dateAdded).getTime()
        expect(newest).toBeGreaterThanOrEqual(oldest);
	});
    test("Route returns an empty array if no matching documents exist", async () => {
		const response = await request(app).get('/missing/search/Jessica');
        expect(response.body).toStrictEqual([]);
	});

    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});