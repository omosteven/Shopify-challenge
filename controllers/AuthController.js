const validator = require("validator");

const passwordHash = require("bcryptjs");

const jwt = require("jsonwebtoken");

const AuthModel = require("../models/UserSchema");

const Util = require("../utility/Util");

const verifyToken = require('../utility/VerifyToken');

class AuthController { /**
   * @description
   *
   * @param {Object}
   *
   * @return {String} Returned messsage
   */
    static signUp(req, res) {
        const request = req.body;

        const {EMAIL, PASSWORD} = request;

        const check = ["EMAIL", "PASSWORD"];

        if (Util.validateInput(check, request)) {
            if (validator.isEmail(EMAIL)) { // validate email

                var hashedPassword = passwordHash.hashSync(PASSWORD, 10);

                request.PASSWORD = hashedPassword;

                if (PASSWORD.length >= 8) {

                    request.CONFIRMCODE = Util.generateRandomStr(10);

                    let SignUp = new AuthModel(request);

                    SignUp.save().then(() => {

                        res.status(200).send({
                            name: "Auth",

                            route: "/auth/register/",

                            message: "Successfully created account.",

                            server: {
                                database: "mongoDB",

                                architecture: "mongoose"
                            }
                        });
                    }).catch(err => { // check if EMAIL exists or not
                        if (err.keyPattern.EMAIL === 1) {
                            res.status(403).send({
                                name: "Auth",

                                route: "/auth/register/",

                                message: "This email is associated with an existing account.",

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });
                        } else {
                            res.status(404).send({
                                name: "Auth",

                                route: "/auth/register/",

                                message: "We're sorry, an error occurred. Kindly try again.",

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });
                        }
                    });

                } else {
                    res.status(401).send({
                        name: "Auth",

                        route: "/auth/register/",

                        message: "The password minimum length required is 8.",

                        server: {
                            database: "mongoDB",

                            architecture: "mongoose"
                        }
                    });
                }
            } else {
                res.status(401).send({
                    name: "Auth",

                    route: "/auth/register/",

                    message: "The email entered is not valid.",

                    server: {
                        database: "mongoDB",

                        architecture: "mongoose"
                    }
                });
            }
        } else {
            res.status(400).send({
                name: "Auth",

                route: "/auth/register/",

                message: "One or more inputs missing.",

                server: {
                    database: "mongoDB",

                    architecture: "mongoose"
                }
            });
        }
    }

    static login(req, res, next) {

        const check = ["EMAIL", "PASSWORD"];

        const request = req.body;

        const {EMAIL, PASSWORD} = request;

        if (Util.validateInput(check, request)) {
            if (validator.isEmail(EMAIL)) {
                // validate email

                // generate user token
                const token = Util.generateToken(EMAIL);

                // look up the email from the database and update the token  if matches
                AuthModel.findOneAndUpdate({
                    EMAIL: EMAIL
                }, {
                    TOKEN: token
                }, (err, result) => {
                    if (err) {
                        res.status(404).send({
                            name: "Auth",

                            route: "/auth/signin/",

                            message: "We're sorry, an error occurred. Kindly try again.",

                            server: {
                                database: "mongoDB",

                                architecture: "mongoose"
                            }
                        });
                    } else { // if no matching result was found from the database
                        if (result === null) {
                            res.status(401).send({
                                name: "Auth",

                                route: "/auth/signin/",

                                payloads: {
                                    EMAIL: "required - String",
                                    PASSWORD: "required - String(>=8)"
                                },

                                message: "Invalid credentials",

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });
                        } else { //    Perform verification

                            var validPasswordTest = passwordHash.compareSync(request.PASSWORD, result.PASSWORD);

                            result.PASSWORD = "";

                            if (validPasswordTest) {

                                result.TOKEN = "";

                                res.status(200).send({
                                    tname: "Auth",

                                    route: "/auth/signin/",

                                    message: "Successfully logged in.",

                                    data: result,

                                    server: {
                                        database: "mongoDB",

                                        architecture: "mongoose"
                                    },

                                    token: token
                                });

                            } else {
                                res.status(401).send({
                                    name: "Auth",

                                    route: "/auth/signin/",

                                    message: "Invalid credentials",

                                    server: {
                                        database: "mongoDB",

                                        architecture: "mongoose"
                                    }
                                });
                            }
                        }
                    }
                });
            } else {
                res.status(401).send({
                    name: "Auth",

                    route: "/auth/signin/",

                    message: "Invalid credentials",

                    server: {
                        database: "mongoDB",

                        architecture: "mongoose"
                    }
                });
            }
        } else {
            res.status(400).send({
                name: "Auth",

                route: "/auth/signin/",

                message: "One or more inputs missing.",

                server: {
                    database: "mongoDB",

                    architecture: "mongoose"
                }
            });
        }
    }

}

module.exports = AuthController;
