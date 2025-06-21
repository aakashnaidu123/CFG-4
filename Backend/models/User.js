module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('CRY', 'NGO'), allowNull: false },
    assignedNgoId: { type: DataTypes.INTEGER, allowNull: true },
  });

  User.associate = (models) => {
    User.hasMany(models.Project, { foreignKey: 'ngoId' });
    User.hasMany(models.Task, { foreignKey: 'assignedToUserId' });
    User.hasMany(models.Document, { foreignKey: 'uploadedByUserId' });
    User.hasMany(models.Feedback, { foreignKey: 'givenBy', as: 'givenFeedback' });
  };

  return User;
};
