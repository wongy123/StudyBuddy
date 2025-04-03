const express = require('express');
const router = express.Router({ mergeParams: true });

const controller = require('../controllers/commentController');
const validateJSON = require('../middleware/validateJSON');

router.route('/')
    .get(controller.getAllComments)
    .post(validateJSON, controller.createComment);
router.route('/:id')
    .get(controller.getCommentById)
    .put(validateJSON, ownerOrModmin(Comment, "user"), controller.updateComment)
    .delete(ownerOrModmin(Comment, "user"), controller.deleteComment);



module.exports = router;