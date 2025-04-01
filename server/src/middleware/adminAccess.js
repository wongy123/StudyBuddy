const asyncHandler = require("express-async-handler");

const adminAccess = asyncHandler((req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
  next();
});

module.exports = adminAccess;