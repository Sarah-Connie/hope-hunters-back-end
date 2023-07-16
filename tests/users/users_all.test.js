const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('users/ route exists.', () => {
	test("Server can access users/ route without error", async () => {
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
		expect(response.body).toHaveLength(2)
	});
    test('Second array in response to contain an object', async () => {
		const response = await request(app).get('/users/');
		expect(typeof(response.body[1][0])).toBe('object');
	});
	test('Response to contain two arrays', async () => {
		const response = await request(app).get('/users/');
		expect(response.body[1][0]).toHaveProperty('policeAreaCommand');
		expect(response.body[1][0]).toHaveProperty('policeDistrict');
		expect(response.body[1][0]).not.toHaveProperty('fullName');
	});

    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});