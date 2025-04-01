const Comment = require('../models/Comment');
const asyncHandler = require('express-async-handler');

exports.getAllComments = asyncHandler(async (req, res, next) => {
    const sessionId = req.params.sessionId;
    const comments = await Comment.find({ session: sessionId });
    res.status(200).json({
        status: 'success',
        results: comments.length,
        data: {
            comments,
        },
    });
});

exports.getCommentById = asyncHandler(async (req, res, next) => {
    const { sessionId, id } = req.params;

    const comment = await Comment.findOne({
        _id: id,
        session: sessionId,
    }).populate("user", "userName displayName");

    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found for this session",
        });
    }

    res.status(200).json({
        success: true,
        data: comment,
    });
});

exports.createComment = asyncHandler(async (req, res, next) => {
});

exports.updateComment = asyncHandler(async (req, res, next) => {
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
});