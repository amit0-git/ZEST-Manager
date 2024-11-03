const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();


router.post('/signup', userController.signup);
router.post('/sendOtp', userController.sendOtp);
router.post('/login', userController.login);

module.exports = router;