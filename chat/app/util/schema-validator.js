const Joi = require('joi');
const ContractCreation = require('../routes/middleware/contract-creation');
const CCRouteSchema = require('../routes/middleware/contract-creation/route-schema');
const response = require('./response');
const HttpStatus = require('http-status-codes');
const constants = require('../routes/constants');

module.exports = class SchemaValidator {

  static get validatorOptions() {
    return {
      presence: 'required',
    };
  }
    /**
     * Note: This function is a synchronous operation
     * @link https://github.com/hapijs/joi
     * @return {Object} {error, value}
     */
  static apply(schemaReceived, schema) {
    if (schemaReceived && schema.isJoi) {
      return Joi.validate(schemaReceived, schema, SchemaValidator.validatorOptions);
    }
    return {
      error: new Error('Invalid argument received'),
      value: null,
    };
  }

    /**
     * Use this this function diectly to validate the HTTP request parameters.
     * @see apply to validate otherwise.
     * Validates if the data received is in a correct format.
     * Returns directly, if an invalid schema is detected.
     * @uses MiddlewareClasses Automatically picks up the defined schema from
     * the schema map of a particular class.
     */
  static ratify(req, resp, next) {
    let e;
    if (req.class[req.url]) {
      const { error } = SchemaValidator.apply(req.body, req.class[req.url]);
      e = error;
    } else {
      e = new Error('Could not find the key to validate schema');
    }
    if (e) { resp.json(response.response(constants.responseFlags.PARAMETER_MISSING, constants.responseMessages.PARAMETER_MISSING, e.message.replace(/["]/ig, ''))); }
  }
};
