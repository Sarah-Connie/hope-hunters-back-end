const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('missing/ route returns all documents in missingpersons collection in ascending order of date added', () => {
	test("Route returns documents formatted as JSON", async () => {
		const response = await request(app).get('/missing/');
		expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
	});
    test("Route returns all documents in missingpersons collection. Seed data contains four documents.", async () => {
		const response = await request(app).get('/missing/');
        expect((response.body).length).toBeGreaterThanOrEqual(4);
	});
    test("Route returns an array containing objects", async () => {
		const response = await request(app).get('/missing/');
        expect(typeof(response.body[0])).toBe('object');
	});
    test("Objects contain documents from the missingpersons collections. Verified by the presence of required fields.", async () => {
		const response = await request(app).get('/missing/');
        expect(response.body[0]).toHaveProperty('fullName');
		expect(response.body[0]).toHaveProperty('age');
		expect(response.body[0]).not.toHaveProperty('token');
	});
    test("Route returns objects sorted in descending order for the dateAdded field", async () => {
		const response = await request(app).get('/missing/');
        const oldest = new Date(response.body[3].dateAdded).getTime()
        const newest = new Date(response.body[0].dateAdded).getTime()
        expect(newest).toBeGreaterThanOrEqual(oldest);

	});

    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});