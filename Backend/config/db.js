const { Sequelize } = require('sequelize');
require('dotenv').config(); // Loads variables from the .env file

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false // Set to console.log to see SQL queries
  }
);

// Export the configured instance
module.exports = sequelize;
