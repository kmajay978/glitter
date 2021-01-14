const moment = require('moment');

module.exports = class MySQL {

  static get MYSQL_DATE_TIME_FORMAT() {
    return 'YYYY-MM-DD HH:mm:ss';
  }

  static get MYSQL_DATE_FORMAT() {
    return 'YYYY-MM-DD';
  }

    /**
     * Converts the moment object to MySQL datetime string.
     * @param {Object} momentObject
     * @return {null|string}
     */
  static convertToMySQLDateTime(momentObject) {
    return momentObject.format(MySQL.MYSQL_DATE_TIME_FORMAT);
  }

    /**
    * Converts the moment object to MySQL date string.
    * @param {Object} momentObject
    * @return {null|string}
    */
  static convertToMySQLDate(momentObject) {
    if (momentObject instanceof moment) {
      return momentObject.format(MySQL.MYSQL_DATE_FORMAT);
    }
    return null;
  }
};
