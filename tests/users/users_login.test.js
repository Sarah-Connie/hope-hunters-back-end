const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('users/login behaves as expected', () => {
	test("Request contains correct email", async () => {
		const response = await request(app)
								.post('/users/login')
								.send({
									email: "megan@email",
	                                password: "password1234"
								});
		expect(response.statusCode).toEqual(400);
		expect(response.body.error).toEqual('Incorrect email address.');
	});
	test("Request contains correct password", async () => {
		const response = await request(app)
								.post('/users/login')
								.send({
									email: "megan@email.com",
	                                password: "password"
								});
		expect(response.statusCode).toEqual(400);
		expect(response.body.error).toEqual('Incorrect password.');
	});
	test("Route users/signup sends an email verification link to provided email address if user document does not contain a JWT", async () => {
		const response = await request(app)
								.post('/users/login')
								.send({
									email: "steve@email.com",
	                                password: "password1234"
								});
		expect(response.statusCode).toEqual(200);
		expect(response.type).toBe('application/json');
		expect(response.body.message).toEqual('A verification email has been sent to steve@email.com.');
	});
	test("User is able to log in if email and password correct and a jwt exists. JWT in response.body", async () => {
		const response = await request(app)
								.post('/users/login')
								.send({
									email: "megan@email.com",
	                                password: "password1234"
								});
		expect(response.statusCode).toEqual(200);
		expect(response.body.message).toEqual('Login successful.');
        expect(response.body).toHaveProperty('token');

	});
	
    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});