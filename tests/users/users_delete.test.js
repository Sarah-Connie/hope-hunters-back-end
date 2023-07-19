const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('users/delete deletes the correct user document from the database', () => {
    test("Route users email stored on JWT to locate the correct user document and permanently delete the document", async () => {
        const response = await request(app)
                                .delete('/users/delete')
                                // Bearer token for Steve M user document
                                .set({ 'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233b447b3f1c4ec466cf407afa980b4b94481529c7b89d004a40d9beadc50716206d97995bb44079ff518da83b8a320ff1fb36d5f9f40c4574f9a1567f8f765267ee4d1d401c507108197c9f2135158b9497c442b9c7161acc9490ad5498a39e7e5'});
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User document for Steve M successful deleted.');
    });
    
    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
    });
});