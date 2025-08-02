const mongoose =  require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    category: { type: String, required: true }, // example: food, rent, etc
    amountBeforeTax:  { type: Number, required: true },
    taxPaid: { type: Number },
    totalAmount: { type: Number, required: true },
    date: { type: Date, required: true },
},  {timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);