const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const validateJSON = require('../middleware/validateJSON');
const authenticateWithJwt = require('../middleware/authenticateWithJwt');


router.route('/')
    .get(controller.getAllUsers)
router.route('/:id')
    .get(controller.getUserById)
    .put(validateJSON, authenticateWithJwt, controller.updateUser)
    .delete(authenticateWithJwt, controller.deleteUser);



module.exports = router;