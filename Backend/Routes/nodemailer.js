const nodemailer = require("nodemailer");
//user server to send mail verification
//mail transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: Number(587),
  service: "gmail",
  secure: Boolean(false),
  auth: {
    user: process.env.mail,
    pass: process.env.password,
  },
});

function sendVerificationEmail(user, token) {
  console.log(`send verfication mail to ${user.email}`);
  const verificationLink = `http://localhost:3000/verified-page/${token}`;
  console.log("send mail by", process.env.mail);
  const mailOptions = {
    from: process.env.mail,
    to: user.email,
    subject: "Email Verification",
    html: `<p>To verify click on the mail ${verificationLink}</p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        reject(false); // Reject the promise with 'false'
      } else {
        console.log("Verification email sent:", info.response);

        resolve(true); // Resolve the promise with 'true'
      }
    });
  });
}

module.exports = sendVerificationEmail;
