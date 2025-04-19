const express = require('express');
const router = express.Router();

const controller = require('../controllers/studySessionController');
const validateJSON = require('../middleware/validateJSON');
const authenticateWithJwt = require('../middleware/authenticateWithJwt');
const ownerOrModmin = require('../middleware/ownerOrModmin');
const StudySession = require('../models/StudySession');
const commentRouter = require('./commentRoutes');
const { validateSession, validateSessionUpdate } = require('../validators/validateSession');
const validatePaginateQueryParams = require('../validators/validatePaginateQueryParams');

router.route('/')
    .get(validatePaginateQueryParams, controller.getAllSessions)
    .post(authenticateWithJwt, validateJSON, validateSession, controller.createSession);

router.get('/joined/:userId', authenticateWithJwt, validatePaginateQueryParams, controller.getJoinedSessions)

router.route('/:id')
    .get(authenticateWithJwt, controller.getSessionById)
    .put(authenticateWithJwt, validateJSON, validateSessionUpdate, ownerOrModmin(StudySession), controller.updateSession)
    .delete(authenticateWithJwt, ownerOrModmin(StudySession), controller.deleteSession);

router.post('/:id/join', authenticateWithJwt, controller.joinSession);

router.post('/:id/leave', authenticateWithJwt, controller.leaveSession);

//Nested comment router
router.use('/:sessionId/comments', authenticateWithJwt, commentRouter);


module.exports = router;