const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Document = sequelize.define('Document', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // project_id and uploader_id will be added
  // via associations in models/index.js
}, {
  // Model options
});

module.exports = Document;