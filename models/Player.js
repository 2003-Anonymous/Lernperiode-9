const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    playerId: {
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

module.exports = mongoose.model("Player", playerSchema);