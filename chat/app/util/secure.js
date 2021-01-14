const crypto = require('crypto');

module.exports = class Secure {

    /**
     * Creates MD5 of the value passed.
     * @return {Promise}
     */
  static createMD5(value) {
    if (!value) { return Secure.createRandomBytes().then(r => crypto.createHash('md5').update(r).digest('hex')); }

    return new Promise((resolve, reject) => resolve(crypto.createHash('md5').update(value).digest('hex')));
  }

    /**
     * Generates cryptographically strong pseudo-random data.
     * The size argument is a number indicating the number of bytes to generate.
     * @return {Promise}
     */
  static createRandomBytes() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(256, (err, buf) => {
        if (err) { reject(err); } else { resolve(buf.toString('hex')); }
      });
    });
  }
};
