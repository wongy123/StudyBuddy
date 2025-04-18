const StudySession = require('../models/StudySession');
const asyncHandler = require('express-async-handler');
const { generatePaginationLinks } = require('../utils/generatePaginationLinks')

exports.getAllSessions = asyncHandler(async (req, res, next) => {
    const result = await StudySession.paginate({}, req.paginate);
  
    res
      .status(200)
      .links(generatePaginationLinks(
        req.originalUrl,
        req.paginate.page,
        result.totalPages,
        req.paginate.limit
      ))
      .json({
        success: true,
        data: result.docs,
        page: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs
      });
  });

exports.getSessionById = asyncHandler(async (req, res, next) => {
    const session = await StudySession.findById(req.params.id);
    if (!session) {
        return res.status(404).json({
            success: false,
            message: `Study session not found`,
        });
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
    const session = req.resource;

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
    const session = req.resource;

    await session.deleteOne();

    res.status(204).send();
});

exports.joinSession = asyncHandler(async (req, res) => {
    const sessionId = req.params.id;

    const session = await StudySession.findById(sessionId);
    if (!session) {
        return res.status(404).json({
            success: false,
            message: "Study session not found",
        });
    }

    const alreadyJoined = session.participants.some(participantId =>
        participantId.equals(req.user._id)
    );

    if (alreadyJoined) {
        return res.status(400).json({
            success: false,
            message: "You have already joined this session",
        });
    }

    session.participants.push(req.user._id);
    await session.save();

    res.status(200).json({
        success: true,
        message: "Successfully joined the session",
        data: session,
    });
});

exports.leaveSession = asyncHandler(async (req, res) => {
    const sessionId = req.params.id;

    const session = await StudySession.findById(sessionId);
    if (!session) {
        return res.status(404).json({
            success: false,
            message: "Study session not found",
        });
    }

    const wasParticipant = session.participants.some(participantId =>
        participantId.equals(req.user._id)
    );

    if (!wasParticipant) {
        return res.status(400).json({
            success: false,
            message: "You are not a participant in this session",
        });
    }

    session.participants = session.participants.filter(
        (participantId) => !participantId.equals(req.user._id)
    );

    await session.save();

    res.status(200).json({
        success: true,
        message: "You have left the session",
        data: session,
    });
});

exports.getJoinedSessions = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { page, limit } = req.paginate;
  
    const result = await StudySession.paginate(
      { participants: { $in: [userId] } },
      { page, limit, sort: { date: 1 } }
    );
  
    res.status(200).json({
      success: true,
      data: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      totalItems: result.totalDocs
    });
  });
  
  