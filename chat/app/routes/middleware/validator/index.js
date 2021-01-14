/**
 * Created by garusis on 27/12/17.
 */
const Joi = require('joi');
const _ = require('underscore');

function Validator() {
}

Validator.prototype.middleware = function (validationData, bodyFields) {

  bodyFields = bodyFields || ['body', 'query', 'params', 'headers'];

  const { schema } = validationData;
  let options = validationData.options || {};

  return function (req, res, next) {
    const data = {};
    bodyFields.forEach(field => _.extend(data, req[field] || {}));

    Joi.validate(data, schema, options, function (err) {
      if (!err || !err.details) return next(err);

      const details = err.details[0];

      console.log(details);

      const response = {
        data: {
          path: details.path
        }
      };

      switch (details.type) {
        case 'any.required': {
          response.message = constants.responseMessages.PARAMETER_MISSING;
          response.status = constants.responseFlags.PARAMETER_MISSING;
          break;
        }
        default: {
          response.message = constants.responseMessages.INCORRECT_PARAMETER;
          response.status = constants.responseFlags.INCORRECT_PARAMETER;
          break;
        }
      }
      res.send(JSON.stringify(response));

    });
  };
};

module.exports = new Validator();