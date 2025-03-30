const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');


router.route('/')
    .get(controller.getAllUsers)
router.route('/:id')
    .get(controller.getUserById)
    .put(controller.updateUser)
    .delete(controller.deleteUser);



module.exports = router;