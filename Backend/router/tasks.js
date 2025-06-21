const express = require('express');
const router = express.Router();
const { getTasksByProject, updateTaskStatus } = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');

router.get('/project/:projectId', authenticateToken, getTasksByProject);

router.patch('/:taskId/status', authenticateToken, updateTaskStatus);

module.exports = router;
