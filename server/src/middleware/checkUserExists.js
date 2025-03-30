const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const checkUserExists = asyncHandler(async (req, res, next) => {
    const { userName, email } = req.body;

    if (!userName || !email) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a username and email',
        });
    }

    const user = await User.findOne({ $or: [{ userName }, { email }] });

    if (user) {
        const conflictFields = [];
        if (user.userName === userName) conflictFields.push("Username");
        if (user.email === email) conflictFields.push("Email");

        return res.status(409).json({
            success: false,
            message: `${conflictFields.join(" and ")} already exist${conflictFields.length > 1 ? '' : 's'}`,
        });
    }
    next();
});

module.exports = checkUserExists;