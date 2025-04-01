const asyncHandler = require("express-async-handler");


const ownerOrModmin = (model, ownerField = "createdBy") =>
    asyncHandler(async (req, res, next) => {
        const resource = await model.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({
                success: false,
                message: `${model.modelName} not found`,
            });
        }

        const ownerId = resource[ownerField];
        const isOwner = ownerId && req.user._id.equals(ownerId);
        const isModmin = ["admin", "moderator"].includes(req.user.role);

        if (!isOwner && !isModmin) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action.",
            });
        }

        req.resource = resource;
        next();
    });

module.exports = ownerOrModmin;
