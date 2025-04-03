const express = require('express');
const router = express.Router();

const controller = require('../controllers/studySessionController');
const validateJSON = require('../middleware/validateJSON');
const authenticateWithJwt = require('../middleware/authenticateWithJwt');
const ownerOrModmin = require('../middleware/ownerOrModmin');
const StudySession = require('../models/StudySession');
const commentRouter = require('./commentRoutes');

router.route('/')
    .get(authenticateWithJwt, controller.getAllSessions)
    .post(validateJSON, authenticateWithJwt, controller.createSession);
router.route('/:id')
    .get(controller.getSessionById)
    .put(validateJSON, authenticateWithJwt, ownerOrModmin(StudySession), controller.updateSession)
    .delete(authenticateWithJwt, ownerOrModmin(StudySession), controller.deleteSession);

router.post('/:id/join', authenticateWithJwt, controller.joinSession);

router.post('/:id/leave', authenticateWithJwt, controller.leaveSession);


router.use('/:sessionId/comments', authenticateWithJwt, commentRouter);


module.exports = router;