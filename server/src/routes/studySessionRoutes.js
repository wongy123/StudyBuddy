const express = require('express');
const router = express.Router();

const controller = require('../controllers/studySessionController');
validateJSON = require('../middleware/validateJSON');


router.route('/')
    .get(controller.getAllStudySessions)
    .post(validateJSON, controller.createStudySession);
router.route('/:id')
    .get(controller.getStudySessionById)
    .put(validateJSON, controller.updateStudySession)
    .delete(controller.deleteStudySession);



module.exports = router;