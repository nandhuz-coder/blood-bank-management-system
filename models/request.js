const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        hospitalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "hospitalId is required"],
        },
        bloodGroup: {
            type: String,
            required: [true, "blood group is required"],
        },
        units: {
            type: Number,
            required: [true, "number of units is required"],
        },
        status: {
            type: String,
            enum: ["pending", "done"],
            default: "pending",
        },
        donors: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            action: {
                type: String,
                enum: ["pending", "waiting", "accepted", "rejected"],
                default: "pending",
            }
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("requests", requestSchema);