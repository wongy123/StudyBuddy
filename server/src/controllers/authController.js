const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.registerUser = asyncHandler(async (req, res, next) => {
    let { userName, displayName = userName, email, password, degree, profileBio = '' } = req.body;

    if (!userName || !email || !password || !degree) {
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
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please provide an email and password',
        });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
    }

    const userObj = user.toObject();
    delete userObj.password;

    const token = await user.generateJWT();
    return res.status(200).json({
        success: true,
        token,
        user: userObj,
    });
});