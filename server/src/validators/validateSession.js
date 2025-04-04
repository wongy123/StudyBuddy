const { body, validationResult } = require("express-validator");

// Common validation result handler
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    next();
};

const validateSession = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ max: 100 }),

    body("description")
        .trim()
        .notEmpty().withMessage("Description is required")
        .isLength({ max: 1000 }),

    body("courseCode")
        .optional()
        .trim()
        .isLength({ max: 20 }),

    body("date")
        .notEmpty().withMessage("Date is required")
        .isISO8601().withMessage("Invalid date format"),

    body("startTime")
        .trim()
        .notEmpty().withMessage("Start time is required")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/),

    body("endTime")
        .trim()
        .notEmpty().withMessage("End time is required")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/),

    body("location")
        .trim()
        .notEmpty().withMessage("Location is required")
        .isLength({ max: 200 }),

    handleValidation
];

const validateSessionUpdate = [
    body("title")
        .optional()
        .trim()
        .notEmpty().withMessage("Title cannot be empty")
        .isLength({ max: 100 }),

    body("description")
        .optional()
        .trim()
        .notEmpty().withMessage("Description cannot be empty")
        .isLength({ max: 1000 }),

    body("courseCode")
        .optional()
        .trim()
        .isLength({ max: 20 }),

    body("date")
        .optional()
        .isISO8601().withMessage("Invalid date format"),

    body("startTime")
        .optional()
        .trim()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/),

    body("endTime")
        .optional()
        .trim()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/),

    body("location")
        .optional()
        .trim()
        .notEmpty().withMessage("Location cannot be empty")
        .isLength({ max: 200 }),

    handleValidation
];

module.exports = {
    validateSession,
    validateSessionUpdate,
};
