const nodemailer = require("nodemailer");


const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.SMTP_MAIL}`,
      pass: `${process.env.S}`,
    },
  });
  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  transporter.sendMail(mailOptions, function (error, Info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent : ` + Info.response);
    }
  });
};
module.exports = sendEmail;
