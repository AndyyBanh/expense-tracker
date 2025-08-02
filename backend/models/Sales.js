const mongoose = require("mongoose");

// Define Schema
const SalesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory", required: true }, // Reference Inventory
    productName: { type: String, required: true },
    size: { type: String, required: true },
    costPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    profit: { type: Number },
    date: { type: Date, default: Date.now},
}, { timestamps: true });

module.exports = mongoose.model("Sales", SalesSchema); // Export the Schema