const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.registerUser = asyncHandler(async (req, res, next) => {
    let { userName, displayName = userName, email, password, degree, profileBio = '' } = req.body;

    if (!userName ||  !email || !password || !degree) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a username and email',
        });
    }

    const user = await User.create({
        userName,
        displayName,
        email,
        password,
        degree,
        profileBio
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({
        success: true,
        data: userObj,
    });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
});