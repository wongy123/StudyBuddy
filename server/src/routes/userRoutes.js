const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const validateJSON = require('../middleware/validateJSON');
const authenticateWithJwt = require('../middleware/authenticateWithJwt');
const ownerOrAdmin = require('../middleware/ownerOrAdmin');


router.route('/')
    .get(authenticateWithJwt, ownerOrAdmin((req) => req.params._id), controller.getAllUsers)
router.route('/:id')
    .get(controller.getUserById)
    .put(validateJSON, authenticateWithJwt, ownerOrAdmin((req) => req.params._id), controller.updateUser)
    .delete(authenticateWithJwt, ownerOrAdmin((req) => req.params._id), controller.deleteUser);

module.exports = router;