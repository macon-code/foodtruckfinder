import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import nodemailer from "nodemailer";

export const sendEmailRouter = createTRPCRouter({
  sendEmail: publicProcedure
    .input(
      z.object({
        to: z.string().email(),
        subject: z.string(),
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Create a transporter using your email service's credentials
        const transporter = nodemailer.createTransport({
          service: "gmail", // Example service, replace with your provider
          auth: {
            user: process.env.EMAIL_USER, // Email account
            pass: process.env.EMAIL_PASS, // Email password or App-specific password
          },
        });

        // Define email options
        const mailOptions = {
          from: `"Your Service" <${process.env.EMAIL_USER}>`, // Sender address
          to: input.to, // Recipient's email
          subject: input.subject, // Email subject
          text: input.text, // Plain text email body
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId); // Logs the message ID on success

        return { success: true, messageId: info.messageId };
      } catch (error: unknown) {
        // Catch error with unknown type
        // TypeScript will now expect you to narrow down the error type
        if (error instanceof Error) {
          // If it's an instance of Error, we can safely access the message
          console.error("Error details:", error.message); // Logs the error message

          // Attempt to cast to nodemailer error type to access 'response'
          if ((error as any).response) {
            console.error(
              "Nodemailer error response:",
              (error as any).response
            ); // Logs the response details
          }

          throw new Error(`Failed to send email: ${error.message}`);
        } else {
          console.error("An unknown error occurred:", error); // If it's not an instance of Error
          throw new Error("An unknown error occurred.");
        }
      }
    }),
});
