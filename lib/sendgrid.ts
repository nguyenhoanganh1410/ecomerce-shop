import sgMail from "@sendgrid/mail";

export const sendEmail = async (to: string, subject: string, text: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL || "babak@manifeststudios.com",
    subject,
    html: text,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};