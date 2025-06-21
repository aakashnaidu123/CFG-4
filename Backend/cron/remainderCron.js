const cron = require('node-cron');
const { Task, User, Project } = require('../models');
const { Op } = require('sequelize');
const sendMail = require('../utils/sendMail');


cron.schedule('0 9 * * *', async () => {
  console.log('🔔 Checking for tasks due in exactly 7 days...');

  
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  
  
  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  try {
    const tasks = await Task.findAll({
      where: {
        due_date: {
          [Op.between]: [startOfDay, endOfDay],
        },
        status: 'Pending'
      },
      include: [
        {
          model: Project,
          required: true, 
          include: [
            { model: User, as: 'Frontliner', attributes: ['email'] },
            { model: User, as: 'NgoPartner', attributes: ['email'] }
          ]
        }
      ]
    });

    console.log(`Found ${tasks.length} tasks due in 7 days.`);

    for (const task of tasks) {
      const project = task.Project;
      const cryFrontlinerEmail = project?.Frontliner?.email;
      const ngoPartnerEmail = project?.NgoPartner?.email;

      const message = `Reminder: The task "${task.name}" for project "${project.name}" is due on ${task.due_date}.`;
      const subject = `Task Reminder: ${task.name}`;

      
      if (cryFrontlinerEmail) {
        await sendMail(cryFrontlinerEmail, subject, message);
        console.log(`Sent reminder to Frontliner at ${cryFrontlinerEmail} for task "${task.name}"`);
      }

      
      if (ngoPartnerEmail) {
        await sendMail(ngoPartnerEmail, subject, message);
        console.log(`Sent reminder to NGO Partner at ${ngoPartnerEmail} for task "${task.name}"`);
      }
    }

    console.log(`✅ Task reminder run complete.`);
  } catch (err) {
    console.error('❌ Reminder cron job failed:', err);
  }
});
