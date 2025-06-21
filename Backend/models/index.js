const sequelize = require('../config/db');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Document = require('./Document');
const Feedback = require('./Feedback');

const db = {};

db.sequelize = sequelize;
db.Sequelize = require('sequelize');


db.User = User;
db.Project = Project;
db.Task = Task;
db.Document = Document;
db.Feedback = Feedback;


User.hasMany(Project, { as: 'FrontlinerProjects', foreignKey: 'frontliner_id' });
Project.belongsTo(User, { as: 'Frontliner', foreignKey: 'frontliner_id' });

User.hasMany(Project, { as: 'NgoProjects', foreignKey: 'ngo_partner_id' });
Project.belongsTo(User, { as: 'NgoPartner', foreignKey: 'ngo_partner_id' });

Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

Project.hasMany(Document, { foreignKey: 'project_id' });
Document.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(Document, { foreignKey: 'uploader_id' });
Document.belongsTo(User, { as: 'Uploader', foreignKey: 'uploader_id' });

Project.hasMany(Feedback, { foreignKey: 'project_id' });
Feedback.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(Feedback, { foreignKey: 'user_id' });
Feedback.belongsTo(User, { foreignKey: 'user_id' });


module.exports = db;