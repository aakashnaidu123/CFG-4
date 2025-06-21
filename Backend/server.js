const app = require('./app');
const db = require('./models');

require('./cron/remainderCron.js'); 

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err);
  });