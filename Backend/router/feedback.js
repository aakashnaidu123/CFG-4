const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbackForProject } = require('../controllers/feedbackController');
const { authenticateToken } = require('../middleware/auth');

// Submit feedback for a project
// Any authenticated user can submit feedback.
router.post('/', authenticateToken, createFeedback);

// Get all feedback for a specific project
router.get('/project/:projectId', authenticateToken, getFeedbackForProject);

module.exports = router;
