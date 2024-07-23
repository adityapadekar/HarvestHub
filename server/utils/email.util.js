/**
 * Utility functions module for sending emails.
 * @exports sendEmail
 */

// Nodemailer package used to send mails
const nodemailer = require("nodemailer");

// Custom error classes
const { InternalServerError } = require("../errors");

/**
 * Sends email to users.
 * @param {string} email - Email id to which the email is to be sent
 * @param {string} subject - Subject of the email
 * @param {string} body - Body of the email
 * @throws {InternalServerError} When sending email results in any error
 */
module.exports.sendEmail = async (email, subject, body) => {
  try {
    /**
     * @instance Transporter instance used to send mails
     * @description Configured to use gmail as service
     */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.RESET_PASSWORD_EMAIL,
        pass: process.env.RESET_PASSWORD_EMAIL_TEMP_PASSWORD,
      },
    });

    const details = {
      from: process.env.RESET_PASSWORD_EMAIL,
      to: email,
      subject: subject,
      text: body,
    };

    await transporter.sendMail(details);
  } catch (error) {
    throw new InternalServerError("Unable to send email!");
  }
};
