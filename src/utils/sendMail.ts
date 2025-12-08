// utils/sendMail.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendMail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const response = await resend.emails.send({
      from: process.env.SENDER_EMAIL!, // e.g. no-reply@yourdomain.com
      to,
      subject,
      html,
    });

    console.log("Email sent:", response);
    return response;
  } catch (error) {
    console.error("Email sending failed:", error);
    return null;
  }
};
