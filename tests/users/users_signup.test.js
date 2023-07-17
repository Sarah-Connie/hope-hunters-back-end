const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('users/signup route adds a new user to the database and sends an email verification link.', () => {
	test("Request contains required field password", async () => {
		const response = await request(app)
								.post('/users/signup')
								.send({
									fullName: "Connie J",
									email: "test@email.com",
									admin: true
								});
		expect(response.statusCode).toEqual(400);
		expect(response.body.error).toEqual('Password missing.');
	});
	test("Request contains required field fullName or stationName", async () => {
		const response = await request(app)
								.post('/users/signup')
								.send({
									email: "test@email.com",
									password: "password",
									admin: true
								});
		expect(response.statusCode).toEqual(400);
		expect(response.body.error).toEqual('Request missing required field/s.');
	});
	test("Route users/signup sends an email verification link on success.", async () => {
		const response = await request(app)
								.post('/users/signup')
								.send({
									fullName: "Connie J",
									email: "test@email.com",
									password: "password",
									admin: true
								});
		expect(response.statusCode).toEqual(200);
		expect(response.type).toBe('application/json');
		expect(response.body.message).toEqual('A verification email has been sent to test@email.com.');
	});
	test("Mongoose schema prevents duplicate users from being added to database by ensuring email is unique", async () => {
		const response = await request(app)
								.post('/users/signup')
								.send({
									fullName: "Connie J",
									email: "test@email.com",
									password: "password",
									admin: true
								});
		expect(response.statusCode).toEqual(400);
		expect(response.body.message).toEqual('Email address is already associated with an account. Please login.');
	});
	
    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});