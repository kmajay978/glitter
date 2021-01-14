const reCAPTCHA = require('recaptcha2')


let recaptcha = new reCAPTCHA({
  siteKey: config.get('recaptchaCredentials.siteKey'),
  secretKey: config.get('recaptchaCredentials.secretKey')
});

function validate(req, resp, next) {
    if(process.env.NODE_ENV === 'unit-test') {
        return next();
    }
  if (req.body && req.body['g-recaptcha-response']) {
    const recaptchaResponse = req.body['g-recaptcha-response'];
    recaptcha.validate(recaptchaResponse)
      .then(function (data) {
        next();
      })
      .catch(function (errorCodes) {
        return resp
          .status(400)
          .send({
            success: false,
            message: recaptcha.translateErrors(errorCodes)
          });
      });
  }
  else{
      return resp
          .status(400)
          .send({
              success: false,
              message: 'Recaptcha required'
          });
  }
}

module.exports = {
  validate
};
