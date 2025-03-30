const express = require('express');
const controller = require('../controllers/authController');
const validateJSON = require('../middleware/validateJSON');
const checkUserExists = require('../middleware/checkUserExists');

const router = express.Router();


router.post('/register', validateJSON, checkUserExists, controller.register);
router.post('/login', validateJSON, controller.login);
router.post('/logout', controller.logout);


module.exports = router;