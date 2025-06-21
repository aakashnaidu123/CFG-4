const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/ngos', authenticateToken, roleCheck(['admin', 'cry_frontliner']), authController.getNgoPartners);

module.exports = router;
