const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('users/signup route adds a new user to the database and sends an email verification link.', () => {
    test("Route users/signup sends an email verification link on success.", async () => {
        const response = await request(app)
                                .post('/users/signup')
                                .send({
                                    stationName: "Example Police Station",
                                    policeAreaCommand: "Southern Region",
                                    policeDistrict: "Murray River",
                                    email: "example@police.nsw.gov.au",
                                    password: "password"
                                });
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
        expect(response.body.message).toEqual('A verification email has been sent to example@police.nsw.gov.au.');
    });
    
    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
    });
});