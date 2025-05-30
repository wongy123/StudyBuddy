const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const fs = require("fs");
const path = require("path");

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
  const user = req.resource;

  // Check if profilePicUrl exists
  if (user.profilePic) {
    // Derive the absolute path to the user's folder
    const userPicFolder = path.join(
      __dirname,
      '..',
      'uploads',
      'profile-pics',
      user._id.toString()
    );

    // Delete the folder if it exists
    fs.rm(userPicFolder, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(`Failed to delete profile pic folder: ${err}`);
      }
    });
  }

  await user.deleteOne();
  res.status(204).send();
});

exports.uploadProfilePic = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const user = req.resource; 

  const relativePath = `/uploads/profile-pics/${user._id}/${req.file.filename}`;
  user.profilePic = relativePath;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile picture uploaded",
    data: { profilePic: relativePath },
  });
});