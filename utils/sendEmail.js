const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");
const sgMail = require("@sendgrid/mail");

const sendEmail = async () => {
  let testAccount = await nodemailer.createTestAccount();
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // const msg = {
  //   to: "sarlarmy02@gmail.com", // Change to your recipient
  //   from: "salamikhalil02@gmail.com", // Change to your verified sender
  //   subject: "Sending with SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // };
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log("Email sent");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // const transporter = nodemailer.createTransport(nodemailerConfig);
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "gladyce46@ethereal.email",
      pass: "fkFmZMgq35ct4cTx6h",
    },
  });

  // // return transporter.sendMail({
  // //   from: '"dev_salami" <sarlarmy@gmail.com>', // sender address
  // //   to,
  // //   subject,
  // //   html,
  // // });
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "codingaddict@gmail.com, salamikhalil02@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
};

module.exports = sendEmail;
