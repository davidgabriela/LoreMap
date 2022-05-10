const mongoose = require("mongoose");

const LoreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        trim: true,
        maxlength: [50, "Title cannot be more than 50 characters"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String
    }
});

module.exports = mongoose.model("Lore", LoreSchema);
