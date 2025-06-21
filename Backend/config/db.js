const { Sequelize } = require('sequelize');
const config = require('./config.js'); // Import from your config.js file

// Create a new Sequelize instance using the credentials from config.js
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    logging: false // Set to console.log to see SQL queries
  }
);

// Export the configured instance
module.exports = sequelize;
