const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Feedback = sequelize.define('Feedback', {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // project_id and user_id will be added via associations
});

module.exports = Feedback;
