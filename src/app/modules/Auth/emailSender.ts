import config from "../../../config";

const nodemailer = require("nodemailer");

const emailSender= async(email: string, html: string) => {
    // Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.password,
    },
  });
  
 
    const info = await transporter.sendMail({
      from: '"PH Health Care" <melonali200@gmail>',
      to: email,
      subject: "Reset Password Link",
    //   text: "Hello world?", // plain‑text body
      html, // HTML body
    });
  
    console.log("Message sent:", info.messageId);
 
}

export default emailSender;