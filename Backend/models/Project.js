module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    cycle: { type: DataTypes.ENUM('Jan', 'July'), allowNull: false },
    startDate: { type: DataTypes.DATEONLY, allowNull: false },
    endDate: { type: DataTypes.DATEONLY, allowNull: false },
  });

  Project.associate = (models) => {
    Project.belongsTo(models.User, { foreignKey: 'ngoId' });
    Project.hasMany(models.Task, { foreignKey: 'projectId' });
  };

  return Project;
};
