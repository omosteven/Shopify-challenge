// set schema for the database
const mongoose = require("mongoose");

const timeStamps = require("mongoose-timestamp");

const AuthSchema = new mongoose.Schema({
    EMAIL: {
        type: String,

        required: true,

        unique: true,

        lowercase: true
    },

    PASSWORD: {
        type: String,

        required: true
    },

    TOKEN: {
        type: String,
        required: true,

        unique: true
    }

});

AuthSchema.plugin(timeStamps, {
    createdAt: "created_at",

    updatedAt: "updated_at"
});

module.exports = mongoose.model("USERDATA", AuthSchema);
