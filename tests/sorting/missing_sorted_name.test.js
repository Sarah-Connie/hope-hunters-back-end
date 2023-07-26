const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('missing/sorted/name route returns all documents in missingpersons collection sorted by alphabetical order', () => {
	test("Route returns documents formatted as JSON", async () => {
		const response = await request(app).get('/missing/sorted/name');
		expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
	});
    test("Route returns all documents in missingpersons collection. Seed data contains four documents.", async () => {
		const response = await request(app).get('/missing/sorted/name');
        expect((response.body).length).toBeGreaterThanOrEqual(4);
	});
    test("Route returns an array containing objects", async () => {
		const response = await request(app).get('/missing/sorted/name');
        expect(typeof(response.body[0])).toBe('object');
	});
    test("Objects contain documents from the missingpersons collections. Verified by the presence of required fields.", async () => {
		const response = await request(app).get('/missing/sorted/name');
        expect(response.body[0]).toHaveProperty('fullName');
		expect(response.body[0]).toHaveProperty('age');
		expect(response.body[0]).not.toHaveProperty('token');
	});
    test("Route returns objects sorted in alphabetical order of the fullName field", async () => {
		const response = await request(app).get('/missing/sorted/name');
        expect(response.body[0].fullName).toBeLessThan(response.body[3].fullName);

	});

    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});