const { MailtrapClient } = require("mailtrap");
require('dotenv').config({ path: `${process.cwd()}/.env` });

const TOKEN = process.env.MAILTRAP_TOKEN;

const mailtrap = new MailtrapClient({
  token: TOKEN,
});

const sendermail = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};

module.exports = {mailtrap, sendermail}



