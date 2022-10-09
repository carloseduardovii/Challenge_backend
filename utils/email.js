const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './set.env' });

class Email {
  constructor(to) {
    this.to = to;
  }

  //Create a conection with an email service Mailtrap
  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  //Send the currently email address
  async send(template, subject, emailData) {
    //Get the pug file that needs to be send
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      emailData
    );

    await this.newTransport().sendMail({
      from: 'alkemymoviesentertaiment@gmail.com',
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    });
  }

  //Send and email to newly created account
  async sendWelcome(name) {
    await this.send('welcome', 'New account', { name });
  }
}

module.exports = { Email };
