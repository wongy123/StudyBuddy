const express = require('express');
const controller = require('../controllers/authController');

const router = express.Router();


router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);


module.exports = router;