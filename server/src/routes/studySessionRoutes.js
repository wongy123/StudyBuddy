const express = require('express');
const router = express.Router();

const controller = require('../controllers/studySessionController');
validateJSON = require('../middleware/validateJSON');


router.route('/')
    .get(controller.getAllSessions)
    .post(validateJSON, controller.createSession);
router.route('/:id')
    .get(controller.getSessionById)
    .put(validateJSON, controller.updateSession)
    .delete(controller.deleteSession);



module.exports = router;