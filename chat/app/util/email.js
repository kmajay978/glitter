const tmail = require('../routes/emailModule');

module.exports = class Email {

    /**
     * Sends email to the user for the sent template id
     * @return {Promise}
     */
  static sendTemplate(templateId, receiverDetails, variableDetails = {}) {
    return new Promise((resolve, reject) => {
      tmail.sendEmailViaTemplate(templateId, receiverDetails, variableDetails, (err, message) => {
        if (err) reject(err);
        else resolve(message);
      });
    });
  }

    /**
     * Sends an email without waiting to check
     * if the mail was successfully queued
     */
  static sendImmediate(mailOptions) {
    tmail.sendNewAsyncWithoutResponse(mailOptions, () => {});
  }

  /**
   * Sends email with template
   * @return {Promise}
   */
  static sendEmail(options, template, data = {}) {
    return new Promise((resolve, reject) => {
      tmail.sendEmail(options, template, data)
        .then((value)=>{
          resolve(value);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

module.exports.emailModule = tmail;
