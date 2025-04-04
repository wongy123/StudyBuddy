const { body, validationResult } = require("express-validator");

// 🔐 User Registration Validator
const validateUser = [
    body("userName")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username must be alphanumeric (underscores allowed)"),

    body("displayName")
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage("Display name must be less than 50 characters"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),

    body("degree")
        .trim()
        .notEmpty().withMessage("Degree is required")
        .isLength({ max: 100 }).withMessage("Degree must be less than 100 characters"),

    body("profileBio")
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage("Bio must be less than 500 characters"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        next();
    }
];

const validateUserUpdate = [
    body("displayName")
        .optional()
        .trim()
        .notEmpty().withMessage("Display name cannot be empty")
        .isLength({ max: 50 }).withMessage("Display name must be less than 50 characters"),

    body("degree")
        .optional()
        .trim()
        .notEmpty().withMessage("Degree cannot be empty")
        .isLength({ max: 100 }).withMessage("Degree must be less than 100 characters"),

    body("profileBio")
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage("Bio must be less than 500 characters"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        next();
    }
];

module.exports = {
    validateUser,
    validateUserUpdate,
};
