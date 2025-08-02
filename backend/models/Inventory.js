const mongoose = require("mongoose");

// Define Schema
const InventorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productName: { type: String, required: true}, // Product Name
    costBeforeTax: { type: Number, required: true}, // Price paid before tax
    taxPaid: { type: Number, default: 0 }, // tax paid (optional)
    totalCost: { type: Number, required: true }, // total cost
    size: { type: String, required: true }, // size 
    condition: { type: String, required: true }, // conditon (e.x brand new)
    paymentMethod: { type: String, required: true }, // payment method (e.x main debt, credit card)
    status: { type: String, enum: ['available', 'sold', 'reserved'], default: 'available' },
    notes: { type: String }, // optional text field
    date: { type: Date, required: true },
}, {timestamps: true });

module.exports = mongoose.model("Inventory", InventorySchema); // Export 