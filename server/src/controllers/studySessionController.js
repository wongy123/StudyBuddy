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
    const { title, description, courseCode = "", date, startTime, endTime, location } = req.body;

    const session = new StudySession({
        title,
        description,
        courseCode,
        date,
        startTime,
        endTime,
        location,
        createdBy: req.user._id,
        participants: [req.user._id], // auto-join the creator
    });

    const savedSession = await session.save();
    res.status(201).json(savedSession);

});

exports.updateSession = asyncHandler(async (req, res, next) => {
    const session = await StudySession.findById(req.params.id);

    if (!session) {
        return res.status(404).json({
            success: false,
            message: "Study session not found",
        });
    }

    const isCreator = session.createdBy.equals(req.user._id);

    if (!isCreator && !isModmin(req.user)) {
        return res.status(403).json({
            success: false,
            message: "You are not authorised to update this session",
        });
    }

    const allowedFields = [
        "title",
        "description",
        "courseCode",
        "date",
        "startTime",
        "endTime",
        "location"
    ];

    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            session[field] = req.body[field];
        }
    });

    const updatedSession = await session.save();

    res.status(200).json({
        success: true,
        data: updatedSession,
    });
});

exports.deleteSession = asyncHandler(async (req, res, next) => {
});