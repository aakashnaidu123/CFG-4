const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cycle: {
    type: DataTypes.ENUM('January', 'July'),
    allowNull: false,
  },
}, {
  // Model options
});

module.exports = Project;