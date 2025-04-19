const express = require('express');
const router = express.Router();

const controller = require('../controllers/qutEventController')


router.get("/", controller.getAllEvents);

module.exports = router;