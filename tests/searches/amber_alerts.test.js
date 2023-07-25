const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('missing/amber-alerts route returns all missingpersons documents where the field amberAlert equal true', () => {
	test("Route returns documents formatted as JSON", async () => {
		const response = await request(app).get('/missing/amber-alerts');
		expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
	});
    test("Route returns only documents where the field amberAlert equals true", async () => {
		const response = await request(app).get('/missing/amber-alerts');
        expect(response.body[0]).toHaveProperty('amberAlert');
        expect(response.body[0].amberAlert).toBe(true);
        expect(response.body[0].amberAlert).not.toBe(false);
	});



    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});