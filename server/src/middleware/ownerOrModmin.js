const asyncHandler = require("express-async-handler");

const ownerOrModmin = (getResourceOwner) =>
    asyncHandler(async (req, res, next) => {
        const ownerId = getResourceOwner(req);
        const isOwner = req.user._id.equals(ownerId);
        const isModmin = ["admin", "moderator"].includes(req.user.role);
        if (!isOwner && !isModmin) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action.",
            });
        }
        next();
    });

module.exports = ownerOrAdmin;

