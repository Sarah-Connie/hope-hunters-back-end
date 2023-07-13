const { encryptString, decryptString } = require('../src/helper_functions/cryptography_management');


describe('Encryption function', () => {
    test('encryptString is a function', () => {
        expect(typeof(encryptString)).toBe("function");
    });
    test('decryptString is a function', () => {
        expect(typeof(decryptString)).toBe("function");
    });
    test('Decrypt encrypted string to return original string', () => {
        expect(decryptString(encryptString('helpers'))).toBe('helpers')
    });
});

