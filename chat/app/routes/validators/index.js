/**
 * Created by garusis on 27/12/17.
 */

/**
 * @type {VendorsValidator}
 */
const vendors = require('./vendors');
/**
 * @type {CompanyValidator}
 */
const companies = require('./companies');

const validators = {
  vendors,
  companies
};

module.exports = validators;