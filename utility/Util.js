const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const axios = require('axios');

class Util {
    /**
   * @description
   *
   * @param {Object}
   *
   * @return {String} Returned messsage
   */

    // to validate the API requests
    static validateInput(check, data) {
        var count = 0;

        for (const key in data) {
            if (check.includes(key)) {
                count += 1;
            }
        }
        if ((count === Object.keys(check).length) & (count !== 0)) {
            return true;
        } else {
            return false;
        }
    }


    // to generate user login token
    static generateToken(EMAIL) {
        const jwtKey = 'my_secret_key';

        const jwtExpirySeconds = 604800;
        // For a week

        const token = jwt.sign({
            EMAIL
        }, jwtKey, {
            algorithm: 'HS256',

            expiresIn: jwtExpirySeconds
        });

        return token;
    }


    // to generate random string
    static generateRandomStr(size) { // return randomBytes(size).toString("hex");
        return crypto.randomBytes(256).toString('hex').slice(0, size);
    }


}

module.exports = Util;
