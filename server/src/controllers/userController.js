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
});

exports.createUser = asyncHandler(async (req, res, next) => {
});

exports.updateUser = asyncHandler(async (req, res, next) => {
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
});