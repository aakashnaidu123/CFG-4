const app = require('./app');
const connectDB = require('./config/db');

// 👇 Import cron job
require('./cron/reminderCron');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
});
