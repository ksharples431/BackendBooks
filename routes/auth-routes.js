const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');

///// LOGIN /////
router.post('/login', authController.loginUser);

///// SIGNUP /////
router.post('/signup', authController.signupUser);

module.exports = router;
