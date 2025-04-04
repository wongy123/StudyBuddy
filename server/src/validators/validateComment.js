const { body, validationResult } = require("express-validator");

const validateComment = [
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ max: 500 })
        .withMessage("Content must be less than 500 characters"),
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

module.exports = { validateComment };