const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbackForProject } = require('../controllers/feedbackController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, createFeedback);

router.get('/project/:projectId', authenticateToken, getFeedbackForProject);

module.exports = router;
