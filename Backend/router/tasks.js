const express = require('express');
const router = express.Router();
const { getTasksByProject, updateTaskStatus } = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');

// Get all tasks for a specific project
router.get('/project/:projectId', authenticateToken, getTasksByProject);

// Update a specific task's status
router.patch('/:taskId/status', authenticateToken, updateTaskStatus);

module.exports = router;
