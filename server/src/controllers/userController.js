const User = require('../models/User');
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
    // if (req.user.id !== id && req.user.role !== 'admin') {
    //     return res.status(403).json({
    //         success: false,
    //         message: 'You are not authorised to update this user',
    //     });
    // }

    const updates = { ...req.body };
    delete updates.role;
    delete updates.password;
    delete updates.email;
    delete updates.userName;

    Object.assign(req.resource, updates);
    const updatedUser = await req.resource.save();
    if (!updatedUser) {
        return res.status(400).json({
            success: false,
            message: 'Error updating user',
        });
    }

    res.status(200).json({
        success: true,
        data: updatedUser,
    });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
    await req.resource.deleteOne();
    res.status(204).send();
});