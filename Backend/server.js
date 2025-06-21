const app = require('./app');
const db = require('./models');

// 👇 Import and start cron job
require('./cron/remainderCron.js'); // Corrected filename

const PORT = process.env.PORT || 5000;

// Sync database and start server
db.sequelize.sync({ force: false }) // Use { force: true } only in dev to drop/recreate tables
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err);
  });