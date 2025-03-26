const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "userId is required"],
        },
        action: {
            type: String,
            enum: ["donation", "request", "approval", "rejection"],
            required: [true, "action is required"],
        },
        details: {
            type: String,
            required: [true, "details are required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("logs", logSchema);