//with MAILGUN
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

module.exports.sendMailWithMailGun = async (data) => {
  const result = await mg.messages.create(
    "sandbox3ed451dd80dd44f8938500c08e742997.mailgun.org",
    {
      from: "Mailgun Sandbox <postmaster@sandbox3ed451dd80dd44f8938500c08e742997.mailgun.org>",
      to: data.to,
      subject: data.to,
      text: data.text,
      html: data.html,
    }
  );
  console.log(result);
  return result.id;
};
