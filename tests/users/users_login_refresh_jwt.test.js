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
                                .set({ 'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233ca19f38f97432cf88b7569cae2bdf7b52544651ec0f1fedacf9822f9c798156893014fbb02b8a926baedce5d38bd2fb8669dd4220fdcda2d13cec40ba65dc275acaeeecf0e2b31c9503557eb17788023f0839e3d9f0ff097b92f529d92399e22a742781ef8fbb60b2b8fdda12d2f50c3ec0c123cf31dc12ae9e95d2f051a863a' })
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