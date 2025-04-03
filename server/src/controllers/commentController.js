const Comment = require('../models/Comment');
const asyncHandler = require('express-async-handler');

exports.getAllComments = asyncHandler(async (req, res, next) => {
    const { sessionId } = req.params;
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
    const content = req.body.content?.trim();
    const { sessionId } = req.params;
    const { _id: userId } = req.user;

    if (!content) {
        return res.status(400).json({
            success: false,
            message: "Comment cannot be empty",
        });
    }

    const comment = new Comment({
        content,
        session: sessionId,
        user: userId,
    });
    const savedComment = await comment.save();
    await savedComment.populate("user", "userName displayName");
    res.status(201).json({
        success: true,
        data: savedComment,
    });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
    exports.updateComment = asyncHandler(async (req, res) => {
        const content = req.body.content?.trim();

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty.",
            });
        }

        const comment = req.resource;
        comment.content = content;

        const updatedComment = await comment.save();
        await updatedComment.populate("user", "userName displayName");

        res.status(200).json({
            success: true,
            data: updatedComment,
        });
    });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
    const comment = req.resource;

    await comment.deleteOne();

    res.status(204).send();
});