const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const validateJSON = require('../middleware/validateJSON');
const authenticateWithJwt = require('../middleware/authenticateWithJwt');
const ownerOrAdmin = require('../middleware/ownerOrAdmin');
const User = require('../models/User');
const adminAccess = require('../middleware/adminAccess');


router.route('/')
    .get(authenticateWithJwt, adminAccess, controller.getAllUsers)
router.route('/:id')
    .get(controller.getUserById)
    .put(validateJSON, authenticateWithJwt, ownerOrAdmin(User, "_id"), controller.updateUser)
    .delete(authenticateWithJwt, ownerOrAdmin(User, "_id"), controller.deleteUser);

module.exports = router;