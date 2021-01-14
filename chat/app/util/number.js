module.exports = class Number {

    /**
     * Returns true if the number is an integer, false
     * otherwise
     * @param {*} value Value to check
     */
  static isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    const x = parseFloat(value);
    return (x | 0) === x;
        /**
         * Note: All bitwise operations work on signed 32 bit integers. So,
         * using bitwise operation will convert float to an integer
         *
         * Note: As compared to Math.floor, btiwise operations are faster.
         */
  }

    /**
     * Returns true if the number is a float, false
     * otherwise
     * @param {*} value Value to check
     */
  static isFloat(value) {
    if (isNaN(value)) {
      return false;
    }
    const x = parseFloat(value);
    return (x | 0) !== x;
        /**
         * Note: Above is a bitwise operation, that works only on signed 32 bit integers.
         */
  }
};
