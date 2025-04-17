const { query, validationResult } = require('express-validator');

const validatePaginateQueryParams = [
    // Validate and sanitize page query parameter
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer')
        .toInt(),

    // Validate and sanitize limit query parameter
    query('limit')
        .optional()
        .isInt({ min: 1 }).withMessage('Limit must be a positive integer')
        .toInt(),

    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        if (!req.paginate) {
            req.paginate = {};
        }

        req.paginate.page = parseInt(req.query.page, 10) || 1;
        req.paginate.limit = Math.min(parseInt(req.query.limit, 10) || 10, 10);

        next();
    }
];

module.exports = validatePaginateQueryParams;
