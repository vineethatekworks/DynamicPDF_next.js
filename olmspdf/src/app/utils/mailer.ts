import { Buffer } from 'node:buffer';
import nodemailer from 'nodemailer';
import process from 'node:process';

// Named function to create transporter
function createGmailTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: "vineethmargana1617@gmail.com",
      pass: "zorw kyti vbcb mnmu",
    },
  });
}

// Named function to create mail options
function createMailOptions(to: string, buffer: Buffer) {
  return {
    from: process.env.EMAIL_ID,
    to,
    subject: 'Nomination PDF',
    text: 'Please find the nomination certificate attached.',
    attachments: [
      {
        filename: 'nomination.pdf',
        content: buffer,
      },
    ],
  };
}

// Final function to send the email
export async function sendMailWithPDF(buffer: Buffer, to: string) {
  try {
    const transporter = createGmailTransporter();

    const mailOptions = createMailOptions(to, buffer);
    await transporter.sendMail(mailOptions);
    console.log(" Email sent successfully.");
    return true;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Something went wrong while sending the email. Details: ${err.message}`);
  }
}