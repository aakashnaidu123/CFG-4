const db = require('../models');

const connectDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connected');
    await db.sequelize.sync({ alter: true }); // or { force: true } for dev reset
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = connectDB;
