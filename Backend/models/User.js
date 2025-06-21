const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('cry_frontliner', 'ngo_partner', 'admin'),
    allowNull: false,
  },
  ngo_name: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, {
  // Model options
});

User.associate = (models) => {
  User.hasMany(models.Project, { foreignKey: 'ngoId' });
  User.hasMany(models.Task, { foreignKey: 'assignedToUserId' });
  User.hasMany(models.Document, { foreignKey: 'uploadedByUserId' });
  User.hasMany(models.Feedback, { foreignKey: 'givenBy', as: 'givenFeedback' });
};

module.exports = User;
