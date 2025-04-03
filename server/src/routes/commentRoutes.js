const express = require('express');
const router = express.Router({ mergeParams: true });

const controller = require('../controllers/commentController');
const validateJSON = require('../middleware/validateJSON');
const Comment = require('../models/Comment');
const { validateComment } = require('../validators/validateComment');

router.route('/')
    .get(controller.getAllComments)
    .post(validateJSON, validateComment, controller.createComment);
router.route('/:id')
    .get(controller.getCommentById)
    .put(validateJSON, validateComment, ownerOrModmin(Comment, "user"), controller.updateComment)
    .delete(ownerOrModmin(Comment, "user"), controller.deleteComment);



module.exports = router;