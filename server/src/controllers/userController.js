const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().select('-password');
    return res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
});

exports.getUserById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
});