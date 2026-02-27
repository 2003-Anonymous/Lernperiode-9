const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: String,
    age: Number,
    money: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);