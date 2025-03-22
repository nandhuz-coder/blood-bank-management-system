const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: [true, "inventory type is required"],
        enum: ["in", "out"]
    },
    bloodGroup: {
        type: String,
        required: [true, "inventory type is required"],
        enum: ["O+", "O-", "AB+", "AB-", "A-", "A+", "B-", "B+"]
    },
    quantity: {
        type: Number,
        require: [true, "quantity is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "organisation is required"]
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            return this.inventoryType === "out";
        }
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            return this.inventoryType === "in";
        }
    },

},
    { timestamps: true }
);
module.exports = mongoose.model("Inventory", inventorySchema);