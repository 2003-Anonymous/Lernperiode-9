const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    }
})

module.export = mongoose.model("User", userSchema)