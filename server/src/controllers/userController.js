const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    return res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
});

exports.getUserById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
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
    const { id } = req.params;
    if (req.user.id !== id && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'You are not authorised to update this user',
        });
    }

    const updates = { ...req.body };
    delete updates.role;
    delete updates.password;
    delete updates.email;
    delete updates.userName;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    res.status(200).json({
        success: true,
        data: updatedUser,
    });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.user.id !== id && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'You are not authorised to delete this user',
        });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    res.status(204).send();
});