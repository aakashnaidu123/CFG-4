module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { 
      type: DataTypes.ENUM('visit', 'report', 'document', 'statutory'), 
      allowNull: false 
    },
    dueDate: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.ENUM('Pending', 'Completed'), defaultValue: 'Pending' },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Project, { foreignKey: 'projectId' });
    Task.belongsTo(models.User, { foreignKey: 'assignedToUserId' });
    Task.hasMany(models.Document, { foreignKey: 'taskId' });
    Task.hasMany(models.Feedback, { foreignKey: 'taskId' });
  };

  return Task;
};
