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
});

exports.createComment = asyncHandler(async (req, res, next) => {
});

exports.updateComment = asyncHandler(async (req, res, next) => {
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
});