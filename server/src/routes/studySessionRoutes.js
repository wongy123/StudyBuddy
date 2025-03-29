const express = require('express');
const router = express.Router();

const controller = require('../controllers/studySessionController');

router.route('/')
    .get(controller.getAllStudySessions)
    .post(controller.createStudySession);
router.route('/:id')
    .get(controller.getStudySessionById)
    .put(controller.updateStudySession)
    .delete(controller.deleteStudySession);


    
module.exports = router;