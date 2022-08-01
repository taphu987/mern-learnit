const express = require('express');

const router = express.Router();

const authController = require('../controllers/AuthController');

// @route POST /api/auth/register
// @desc Register a user
// @access public
router.post('/register', authController.register);

// @route POST /api/auth/login
// @desc Login the user
// @access public
router.post('/login', authController.login);

module.exports = router;
