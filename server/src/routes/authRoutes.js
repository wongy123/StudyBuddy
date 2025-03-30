const express = require('express');
const controller = require('../controllers/authController');
const validateJSON = require('../middleware/validateJSON');
const checkUserExists = require('../middleware/checkUserExists');

const router = express.Router();


router.post('/register', validateJSON, checkUserExists, controller.registerUser);
router.post('/login', validateJSON, controller.loginUser);
//router.post('/logout', controller.logout); for future implementation


module.exports = router;