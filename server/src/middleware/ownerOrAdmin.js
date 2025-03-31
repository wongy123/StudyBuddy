const asyncHandler = require("express-async-handler");

const ownerOrAdmin = (getResourceOwner) =>
    asyncHandler(async (req, res, next) => {
        const ownerId = getResourceOwner(req);
        const isOwner = req.user._id.equals(ownerId);
        const isAdmin = req.user.role === "admin";
        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action.",
            });
        }
        next();
    });

module.exports = ownerOrAdmin;

