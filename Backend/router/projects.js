const express = require('express');
const router = express.Router();
const { Project, Task } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Get one project
router.get('/:id', authenticateToken, async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  res.json(project);
});

// Get tasks in a project
router.get('/:id/tasks', authenticateToken, async (req, res) => {
  const tasks = await Task.findAll({ where: { projectId: req.params.id } });
  res.json(tasks);
});

module.exports = router;
