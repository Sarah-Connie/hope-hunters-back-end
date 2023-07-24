const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../../src/server');


describe('missing/delete deletes the correct user document from the database', () => {
    test("Route also allows a police user to delete the document", async () => {
        // Generate a new missing person document so that an _id can be obtained
        const newResponse = await request(app)
                                .post('/missing/new')
                                .send({
                                    fullName: "Duncan W",
                                    ageNumber: 32,
                                    ageType: "years",
                                    areaSuspectedToBe: "Coogee",
                                    distinctiveFeatures: "none",
                                })
                                // Bearer token for verified user Peter R
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f63dd935462363664fc8e03c2bea82c7549f0247c573c89b0ea894dfe2b8574861beaf4c32a7455f28f7f2ab65fcd908ecac4585634ca894ea3b4c62b605d6b90d'});
        const updatedResponse = await request(app)
                                .delete(`/missing/delete/` + newResponse.body._id)
                                // Bearer token for police user Sawtell Police Station
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233178559778e103d219059b52665e2310e6b2760a8d34aee96cac4b5bc88b7ca5a30df1889b634cde6fd898fd2bbbb4775b3330a431f123ba45817581d10e70277781a5c3da1acccc86b708a3e525cc80183b0c4d5945e1767a05cf12131b11526eac39bfd474258794a02a0677641939b'});
        expect(updatedResponse.statusCode).toEqual(200);
        expect(updatedResponse.type).toBe('application/json');
        expect(updatedResponse.body).toHaveProperty('message');
        expect(updatedResponse.body.message).toBe('Missing person listing successfully deleted.');
    });
    test("Route prevents unauthorised user from modifying the document", async () => {
        // Generate a new missing person document so that an _id can be obtained
        const newResponse = await request(app)
                                .post('/missing/new')
                                .send({
                                    fullName: "Sam B",
                                    ageNumber: 88,
                                    ageType: "years",
                                    areaSuspectedToBe: "Newcastle",
                                    distinctiveFeatures: "none",
                                })
                                // Bearer token for police user Sawtell Police Station
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233178559778e103d219059b52665e2310e6b2760a8d34aee96cac4b5bc88b7ca5a30df1889b634cde6fd898fd2bbbb47756e2d41e4e9fc29405f3697531e27410e80262604a60ed21293bf0d49ef91cde94ed38790f97dea337c724658528998ee5020ca862417f9f847968430c853cfde'});
		const updatedResponse = await request(app)
                                .delete(`/missing/delete/` + newResponse.body._id)
                                // Bearer token for general user Ken W
                                .set({'authorization': 'Bearer 18b4ec91883a39a06015c7184e0b51d79240ffc944639f525563c0e42a3eedfbb946c614c58c20c2373f7f334c2d9233a24c502580595c9f90d6fed58bb0ed616e551b636f83285f6425424ead50b0f63d345a28c88fbd2e722eac1d4dbe4a22605e016641775235e51d7926a621cd07e549803112234bbb89768e0c4f6a6b9c77faae298c2e11e695c7a6d0e10a4b4c'});
        expect(updatedResponse.statusCode).toEqual(401);
        expect(updatedResponse.body).toHaveProperty('error');
        expect(updatedResponse.body.error).toBe('User unauthorised to alter this document.');
    });
    
    afterAll(done => {
        // Close database connection after testing finished
        mongoose.connection.close();
        done();
    });
});