const { Task, Project } = require('../models');
const { Op } = require('sequelize');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.update(req.body);
    res.json({ message: 'Task updated', task });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
};

exports.tasksDueIn7Days = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    const tasks = await Task.findAll({
      where: {
        dueDate: { [Op.between]: [today, sevenDaysLater] },
        assignedToUserId: req.user.id,
      },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks', details: err.message });
  }
};

// Get all tasks for a specific project
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.findAll({ 
      where: { project_id: projectId },
      order: [['due_date', 'ASC']] 
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
};


exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body; 

    if (!['Pending', 'Completed', 'Overdue'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status provided.' });
    }

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    

    task.status = status;
    await task.save();

    res.status(200).json({ message: 'Task status updated successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status', details: error.message });
  }
};
