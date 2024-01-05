const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'athvicbaby@gmail.com',
    pass: 'qwdo rmfp ihvr xypk',
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'athvicbaby@gmail.com',
    to:to,
    subject:'Password Reset',
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };

