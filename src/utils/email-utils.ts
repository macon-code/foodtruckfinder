import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { to, subject, text } = req.body;

    // Set up the email transport using your SMTP provider (e.g., Gmail, Mailgun, etc.)
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or your SMTP provider (Mailgun, SendGrid, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email
      to, // Recipient's email
      subject,
      text,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully", info });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default sendEmail;
