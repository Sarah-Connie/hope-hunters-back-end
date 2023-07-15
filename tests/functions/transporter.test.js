const { transporter } = require('../../src/helper_functions/nodemailer_transporter')

describe("nodemailer transporter variable", () => {
    test("transporter variable to not be undefined", () => {
        expect(transporter).not.toBeUndefined()
    });
    test("transporter variable exists", () => {
        expect(typeof(transporter)).toBe("object");
    });
});