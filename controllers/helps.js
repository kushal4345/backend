const validate = require("validator");

const validation = (req) => {
    const { password, confirmPassword, email } = req.body;

    if (!validate.isEmail(email)) {
        throw new Error("Email is not valid");
    }


    if (
        !validate.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
    ) {
        throw new Error("Password is not strong");
    }
};


module.exports = validation;
