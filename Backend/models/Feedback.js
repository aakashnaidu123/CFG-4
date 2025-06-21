const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Feedback = sequelize.define('Feedback', {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Feedback;
