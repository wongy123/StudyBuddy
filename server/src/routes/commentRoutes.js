const express = require('express');
const router = express.Router({ mergeParams: true });

const controller = require('../controllers/commentController');
validateJSON = require('../middleware/validateJSON');

router.route('/')
    .get(controller.getAllComments)
    .post(validateJSON, controller.createComment);
router.route('/:id')
    .get(controller.getCommentById)
    .put(validateJSON, controller.updateComment)
    .delete(controller.deleteComment);



module.exports = router;