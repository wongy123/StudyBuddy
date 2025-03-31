const StudySession = require('../models/StudySession');
const asyncHandler = require('express-async-handler');

exports.getAllSessions = asyncHandler(async (req, res, next) => {
    const sessions = await StudySession.find();
    res.status(200).json({
        status: 'success',
        results: sessions.length,
        data: {
            sessions,
        },
    });
});

exports.getSessionById = asyncHandler(async (req, res, next) => {
    const session = await StudySession.findById(req.params.id);

    if (!session) {
        res.status(404);
        throw new Error('Study session not found');
    }

    res.status(200).json(session);
});

exports.createSession = asyncHandler(async (req, res, next) => {
});

exports.updateSession = asyncHandler(async (req, res, next) => {
});

exports.deleteSession = asyncHandler(async (req, res, next) => {
});