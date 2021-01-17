// set schema for the database
const mongoose = require("mongoose");

const timeStamps = require("mongoose-timestamp");

const ImagesSchema = new mongoose.Schema({
    EMAIL: {
        type: String,

        required: true,

        unique: true,

        lowercase: true
    },

    FILENAME: {
        type: String,

        required: true
    },

    FILEPERMISSION: {
        type: String,

        required: true
    }

});

ImagesSchema.plugin(timeStamps, {
    createdAt: "created_at",

    updatedAt: "updated_at"
});

module.exports = mongoose.model("IMAGESDATA", ImagesSchema);
