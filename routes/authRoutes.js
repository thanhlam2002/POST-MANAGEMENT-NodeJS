const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Định nghĩa các route liên quan đến Auth
router.post('/register', authController.register);  // Đăng ký
router.post('/login', authController.login);        // Đăng nhập

module.exports = router;
