const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Overdue'),
    defaultValue: 'Pending',
    allowNull: false,
  },
  // project_id will be added via association in models/index.js
}, {
  // Model options
});

module.exports = Task;