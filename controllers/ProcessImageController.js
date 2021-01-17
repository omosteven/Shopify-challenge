// const uploadFile = require("../middlewares/upload");
const ImagesSchema = require("../models/ImagesSchema");

const verifyToken = require('../utility/VerifyToken');

const Util = require("../utility/Util");

class CurrencyRateController { /**
    * @description
    *
    * @param {Object}
    *
    * @return {String} Returned messsage
    */

    static addImages(req, res) {
        const {TOKEN, EMAIL, PERMISSION} = req.body;
        const check = ["EMAIL", "TOKEN", "PERMISSION"];
        // check if TOKEN is found in the request or not
        if (TOKEN !== undefined && TOKEN !== null) {

            const isTokenValidThenEmail = verifyToken(TOKEN);

            // check the state of the token if expired or not
            if (isTokenValidThenEmail === 'Expired!') {
                res.status(401).send({
                    name: "Add Images",

                    route: "/images/add",

                    message: 'Your session has Expired! Kindly login again.',

                    server: {
                        database: 'mongoDB',

                        architecture: 'mongoose'
                    }
                });
            } else if (isTokenValidThenEmail === 'Error') {
                res.status(401).send({
                    name: "Add Images",

                    route: "/images/add",

                    message: "You are unauthorized for this.",

                    server: {
                        database: 'mongoDB',

                        architecture: 'mongoose'
                    }
                });
            } else {

                if (Util.validateInput(check, req.body)) {

                    if (req.files != undefined) {

                        if (isTokenValidThenEmail === EMAIL) { // define an empty array to keeep all files with email as objects
                            const allInsertSchema = [];

                            var insertSchema = {};

                            var allFileNames = [];
                            // loop through the files and map each as a schema
                            req.files.forEach(eachImage => {

                                allFileNames.push(eachImage.filename);

                                insertSchema = {
                                    FILEPERMISSION: PERMISSION,
                                    EMAIL: EMAIL,
                                    FILENAME: eachImage.filename
                                }

                                allInsertSchema.push(insertSchema);
                            });

                            ImagesSchema.insertMany(insertSchema, (addErr, addRes) => {
                                if (addErr) {
                                    res.status(400).send({
                                        name: "Add Images",

                                        route: "/images/add",

                                        message: "We're sorry, we could not add the image(s)",

                                        server: {
                                            database: "mongoDB",

                                            architecture: "mongoose"
                                        }
                                    });
                                } else {
                                    res.status(202).send({
                                        name: "Add Images",

                                        route: "/images/add",

                                        message: "Image(s) successfully added and each file name has been renamed accordingly as below.",

                                        filenames: allFileNames,

                                        server: {
                                            database: "mongoDB",

                                            architecture: "mongoose"
                                        }
                                    });
                                }
                            })
                        } else {
                            res.status(401).send({
                                name: "Add Images",

                                route: "/images/add",

                                message: "You're unauthorized for this.",

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });
                        }
                    } else {
                        res.status(400).send({
                            name: "Add Images",

                            route: "/images/add",

                            message: "Images can not be empty",

                            server: {
                                database: "mongoDB",

                                architecture: "mongoose"
                            }
                        });
                    }
                } else {
                    res.status(400).send({
                        name: "Add Images",

                        route: "/images/add",

                        message: "One or more inputs missing.",

                        server: {
                            database: "mongoDB",

                            architecture: "mongoose"
                        }
                    });
                }
            }
        }
    }


}

module.exports = CurrencyRateController;
