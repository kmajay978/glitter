const constants = require('../constants')

module.exports = class Response {

    /**
     * @deprecated
     */
  static SUCCESS_RESPONSE(httpCode, message, data = []) {
    return {
      status: httpCode,
      message,
      data,
    };
  }

    /**
     * Common function to send a response
     */
  static response(httpCode, message, data) {
    return {
      status: httpCode,
      message,
      data: data || {}
    };
  }


  /**
   * SUCCESS RESPONSE
   */
  static successResponse(data) {
    return {
      status: constants.responseFlags.ACTION_COMPLETE,
      message:constants.responseMessages.ACTION_COMPLETE,
      data: data || {}
    };
  }

  /**
   * SHOW ERROR RESPONSE
   */
  static showErrorResponse(data) {
    return {
      status: data && data.status || constants.responseFlags.BAD_REQUEST,
      message: data && data.message || constants.responseMessages.SHOW_ERROR_MESSAGE,
      data: data && data.data || {}
    };
  }


  /**
   * BAD REQUEST ERROR RESPONSE
   */
  static badRequestErrorResponse(httpCode, message, data) {
    return {
      status: constants.responseFlags.BAD_REQUEST,
      message: constants.responseMessages.BAD_REQUEST,
      data: data || {}
    };
  }
};
