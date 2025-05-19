import Mailgun from "mailgun.js";
import formData from "form-data";
import "dotenv/config";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "weather api",
  key: process.env.MAILGUN_API_KEY,
});

const sendEmail = async (email, subject, html) => {
  await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: "<noreply@weatherapp>",
    to: [email],
    subject: subject,
    html,
  });
};

export default sendEmail;
