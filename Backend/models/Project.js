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
  // We will associate frontliner_id and ngo_partner_id
  // via the models/index.js file.
}, {
  // Model options
});

module.exports = Project;