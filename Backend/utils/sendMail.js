const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `"CRY Reminder" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📨 Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}`, err.message);
  }
};

module.exports = sendEmail;
