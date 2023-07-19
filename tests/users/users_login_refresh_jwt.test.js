const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('users/login/refresh-token can update a jwt on a user document', () => {
	test("Request headers contains a bearer token", async () => {
		const response = await request(app)
                                .put('/users/login/refresh-token')
                                .set({ 'authorization': '' })
		expect(response.statusCode).toEqual(401);
        expect(response.type).toBe('application/json');
		expect(response.body.error).toEqual('User authorisation could not be verified.');
	});
    test("Route verifies jwt and updates token in user document", async () => {
		const response = await request(app)
                                .put('/users/login/refresh-token')
                                .set({ 'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233ca19f38f97432cf88b7569cae2bdf7b52544651ec0f1fedacf9822f9c798156801de56da43dd7d6bb92449e6c33ff0493ed442f8403e5b92f00bd1ad92cadffb9c7a379f5ce607f698f0f77639feada82ef0d861993f26839b1c8c0fd460ac0b' })
		expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
		expect(response.body).toHaveProperty('token');
	});
	
    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
      });
});