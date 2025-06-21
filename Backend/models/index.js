const Sequelize = require('sequelize');
const config = require('../config/config.js');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Models
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Project = require('./Project')(sequelize, Sequelize.DataTypes);
db.Task = require('./Task')(sequelize, Sequelize.DataTypes);
db.Document = require('./Document')(sequelize, Sequelize.DataTypes);
db.Feedback = require('./Feedback')(sequelize, Sequelize.DataTypes);

// Associations
Object.keys(db).forEach(model => {
  if (db[model].associate) db[model].associate(db);
});

module.exports = db;
