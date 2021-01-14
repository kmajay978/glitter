/**
 * Created by garusis on 27/12/17.
 */
const Joi = require('joi');

function CompanyValidator() {
}

CompanyValidator.prototype.register = {
  options: { allowUnknown: true },
  schema: Joi.object().keys({
    password: Joi.string().required().regex(/[A-Z]/g).regex(/[a-z]/g)
  })
};

module.exports = new CompanyValidator();