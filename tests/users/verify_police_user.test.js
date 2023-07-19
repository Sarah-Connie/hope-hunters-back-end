const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('users/signup/police/confirmation/:email returns a jwt token on success.', () => {
    test("Route send JWT in response.body on success.", async () => {
        const response = await request(app).put('/users/signup/police/confirmation/albanytest@police.nsw.gov.au');
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toHaveProperty('error');
        expect(response.body).toHaveProperty('token');
    });
    
    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
    });
});