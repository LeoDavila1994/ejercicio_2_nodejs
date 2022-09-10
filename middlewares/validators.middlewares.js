const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => {
            return err.msg;
        });

        const message = errorMessages.join(". ");

        return res.status(400).json({
            status: "error",
            message: message,
        });
    }

    next();
};

const createUserValidators = [
    body("name")
        .isString()
        .withMessage("Name most be a string")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),
    body("email").isEmail().withMessage("Most provide a valid email"),
    body("password")
        .isString()
        .withMessage("Password most be a string")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 8 })
        .withMessage("Password must be a least 8 characters"),
    checkValidations,
];

const updateUserValidator = [
    body("name")
        .isString()
        .withMessage("Name most be a string")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),
    body("email").isEmail().withMessage("Most provide a valid email"),
    checkValidations,
]

module.exports = { createUserValidators, updateUserValidator };
