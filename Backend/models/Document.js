module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    fileUrl: { type: DataTypes.STRING, allowNull: false },
    uploadedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  Document.associate = (models) => {
    Document.belongsTo(models.User, { foreignKey: 'uploadedByUserId' });
    Document.belongsTo(models.Task, { foreignKey: 'taskId' });
  };

  return Document;
};
