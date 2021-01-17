const jwt = require("jsonwebtoken");

const verifyToken = (token) => {

    try {

        payload = jwt.verify(token, "my_secret_key");

        return payload.EMAIL

    } catch (e) {

        if (e instanceof jwt.JsonWebTokenError) {
            return "Expired!"

        } else {

            return "Error"

        }

    }

}

module.exports = verifyToken;