const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('users/update allows user to update their details.', () => {
    test("Contents of request.body replace corresponding fields on user document", async () => {
        const response = await request(app)
                                .put('/users/update')
                                .send({
									fullName: "Peter A",
	                                admin: true
								})
                                .set({ 'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f6346d84c1160ab0cd4bcb839c07a3857eab2f9a8618ff4c0180c9a6ca5f19f8e3ae7709d7f14ff2a45e6766b00184b0677c316a022216ebb43b50936567dd1e7a'});
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('admin');
        expect(response.body).not.toHaveProperty('token');
        expect(response.body.admin).toBe(true);
    });
    
    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
    });
});