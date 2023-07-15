const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('users/ route exists.', () => {
	test("Server 'can access users/ route without error", async () => {
		const response = await request(app).get('/users/');
		expect(response.statusCode).toEqual(200);
	});
    test('Response data to be json', async () => {
		const response = await request(app).get('/users/');
		expect(response.type).toBe('application/json');
	});
    test('Response to be truthy', async () => {
		const response = await request(app).get('/users/');
		expect(response.body).toBeTruthy;
	});
    test('Response to contain two arrays', async () => {
		const response = await request(app).get('/users/');
		expect(response.body).toEqual([[], []]);
	});

    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});