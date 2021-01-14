const moment = require('moment');
const q = require('../db');
const Constant = require('./constant');
const Promise = require('bluebird');
const MySQL = require('./mysql');

module.exports = class Token {

  static get workerComponents() {
    return [
      'project',
      'program',
    ];
  }

    /**
     * @param {String} checkFor - Table Name (component name)
     * @param {String} token - Token to check for
     * @param {Object} timeDifference - Moment instance capturing the date-time to check for
     * @return {Promise}
     */
  static checkValidity(checkFor, token, timeDifference, operand = '<', checkUser) {
    try {
      if (Token.workerComponents.includes(checkFor)) {
        const tableName = Token.getTable(checkFor);
        if (tableName) {
          const mySqlTimeDate = MySQL.convertToMySQLDateTime(timeDifference);
          return q.find(tableName, [], { token: `${token}` })
                        .then((r) => {
                            // Was able to find the token
                          if (r.length > 0 && r[0].token_generation_time) {
                            if ((new Date().getTime() - new Date(r[0].token_generation_time).getTime()) < 24 * 60 * 60 * 1000) { 
                              return { status: true, data: r }; 
                            }
                            else if(checkUser) {
                              return { status: true, expired: true, data: r }; 
                            }
                            return { status: false };
                          } return { status: false }; // Could not find the token matching the condition
                        });
        }
        throw new Error('Could not find table name');
      } else {
        throw new Error('Invalid component/moment passed');
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }

    /**
     * Gets the table name corresponding to the component
     * name passed
     */
  static getTable(component) {
    switch (component) {
      case 'program':
        return Constant.TABLE_ROLE_PROGRAM_MAP;
      case 'project':
        return Constant.TABLE_ROLE_PROJECT_MAP;
      default:
        return false;
    }
  }
};
