const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('missing/sorted/name route returns all documents in missingpersons collection sorted by alphabetical order', () => {
	test("Route returns documents formatted as JSON", async () => {
		const response = await request(app).get('/missing/sorted/fullName');
		expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
	});
    test("Route returns all documents in missingpersons collection. Seed data contains four documents.", async () => {
		const response = await request(app).get('/missing/sorted/lastSeen');
        expect((response.body).length).toBeGreaterThanOrEqual(4);
	});
    test("Objects contain documents from the missingpersons collections. Verified by the presence of required fields.", async () => {
		const response = await request(app).get('/missing/sorted/fullName');
        expect(response.body[0]).toHaveProperty('fullName');
		expect(response.body[0]).toHaveProperty('age');
		expect(response.body[0]).not.toHaveProperty('token');
	});
    test("Route returns objects sorted in alphabetical order of the fullName field when :option equals fullName", async () => {
		const response = await request(app).get('/missing/sorted/fullName');
        // Array containing the fullName fields for the first 3 objects returned in the response
        const result = [response.body[0].fullName, response.body[1].fullName, response.body[2].fullName]
        // Sort the response body in alphabetical order for the fullName fields. The two arrays should match
        const sorted = (response.body).sort(function(a, b) {
            if (a.fullName < b.fullName) {
                return -1;
              }
              if (a.fullName > b.fullName) {
                return 1;
              }
              return 0;
        })
        expect(result).toEqual(expect.arrayContaining([sorted[0].fullName, sorted[1].fullName, sorted[2].fullName]));
	});
    test("Route returns objects sorted in alphabetical order of the fields in the locationLastSeen field when :option equals lastSeen", async () => {
		const response = await request(app).get('/missing/sorted/lastSeen');
        // Array containing the locationLastSeen.city fields for the first 3 objects returned in the response
        const result = [response.body[0].locationLastSeen.city, response.body[1].locationLastSeen.city, response.body[2].locationLastSeen.city]
        // Sort the response body in alphabetical order for the locationLastSeen.city fields. The two arrays should match
        const sorted = (response.body).sort(function(a, b) {
            if (a.locationLastSeen.city < b.locationLastSeen.city) {
                return -1;
                }
                if (a.locationLastSeen.city > b.locationLastSeen.city) {
                return 1;
                }
                return 0;
        })
        expect(result).toEqual(expect.arrayContaining([sorted[0].locationLastSeen.city, sorted[1].locationLastSeen.city, sorted[2].locationLastSeen.city]));
	});
    test("Route returns objects sorted in descending order of dateLastSeen when :option equals dateLastSeen", async () => {
		const response = await request(app).get('/missing/sorted/dateLastSeenNewest');
        const newest = new Date(response.body[0].dateLastSeen).getTime()
        const older = new Date(response.body[3].dateLastSeen).getTime()
        expect(older).toBeLessThanOrEqual(newest);
	});
    test("Route returns objects sorted in ascending order of dateLastSeen when :option equals dateLastSeen", async () => {
		const response = await request(app).get('/missing/sorted/dateLastSeenOldest');
        const newer = new Date(response.body[3].dateLastSeen).getTime()
        const older = new Date(response.body[0].dateLastSeen).getTime()
        expect(older).toBeLessThanOrEqual(newer);
	});
    test("Route returns objects sorted in ascending order of currentAge when :option equals currentAge. Documents should first be sorted by the array in the currentAge.type field: ['hour', 'hours', 'day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years']", async () => {
		const response = await request(app).get('/missing/sorted/currentAge');
        expect(response.body[0].currentAge[0]).toHaveProperty('type', 'months');
        expect(response.body[1].currentAge[0]).toHaveProperty('type', 'years');
        expect(response.body[2].currentAge[0].number <= response.body[3].currentAge[0].number).toBe(true);

	})
    test("Route returns objects sorted in ascending order of age when :option equals ageYoungest. Documents should first be sorted by the array in the currentAge.type field: ['hour', 'hours', 'day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years']", async () => {
		const response = await request(app).get('/missing/sorted/ageYoungest');
        expect(response.body[0].age[0]).toHaveProperty('type', 'months');
        expect(response.body[1].age[0]).toHaveProperty('type', 'years');
        expect(response.body[2].age[0].number <= response.body[3].age[0].number).toBe(true);
	});
    test("Route returns objects sorted in descending order of age when :option equals ageOldest. Documents should first be sorted by the array in the currentAge.type field: ['hour', 'hours', 'day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years']", async () => {
		const response = await request(app).get('/missing/sorted/ageOldest');
        expect(response.body[3].age[0]).toHaveProperty('type', 'months');
        expect(response.body[2].age[0]).toHaveProperty('type', 'years');
        expect(response.body[2].age[0].number >= response.body[3].age[0].number).toBe(true);
	});

    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});