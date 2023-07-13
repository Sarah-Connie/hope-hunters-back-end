const { encryptString, decryptString } = require('../src/helper_functions/cryptography_management');


describe("Access to environmental variables", () => {
    test('Variable is accessible', () => {
        expect(process.env.DATABASE_URL).toBeTruthy()
    })
    test('Variable is accessible', () => {
        expect(process.env.SENDGRID_API_KEY).toBeTruthy()
    })
    test('Variable is accessible', () => {
        expect(process.env.JWT_SECRET).toBeTruthy()
    })
    test('Variable is accessible', () => {
        expect(process.env.ENC_KEY).toBeTruthy()
    })
    test('Variable is accessible', () => {
        expect(process.env.ENC_IV).toBeTruthy()
    })
    test('Variable is accessible', () => {
        expect(process.env.SECRET_SALT).toBeTruthy()
    })
});