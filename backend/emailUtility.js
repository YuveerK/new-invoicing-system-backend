import nodemailer from "nodemailer";
import { ENV } from "./env.js";

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: ENV.MAIL_SERVICE,
  auth: {
    user: ENV.MAIL_USER,
    pass: ENV.MAIL_PASS,
  },
});

// Function to send email with attachment
export async function sendEmailWithAttachment(
  buffer,
  email,
  subject,
  filename,
  htmlText
) {
  const info = await transporter.sendMail({
    from: `"Yuveer Kallideen" <${ENV.MAIL_USER}>`,
    to: email,
    subject: subject,
    html: htmlText,
    attachments: [
      {
        filename: filename,
        content: buffer,
        contentType: "application/pdf",
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
}
