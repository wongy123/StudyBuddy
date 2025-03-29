const express = require('express');
const router = express.Router({ mergeParams: true });

const controller = require('../controllers/commentController');

router.route('/')
    .get(controller.getAllComments)
    .post(controller.createComment);
router.route('/:id')
    .get(controller.getCommentById)
    .put(controller.updateComment)
    .delete(controller.deleteComment);



module.exports = router;