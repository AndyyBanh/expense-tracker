import React, { useState } from "react";
import Input from "../Inputs/Input";

const AddExpenseForm = ({ onAddExpense }) => {
    const [income, setIncome] = useState({
        category: "",
        amountBeforeTax: "",
        taxPaid: "",
        totalAmount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => {
        let updated = {...income, [key]: value};

        // Update totalAmount if taxPaid or amountBeforeTax changes
        if (key === "amountBeforeTax" || key === "taxPaid") {
            const cost = parseFloat(updated.amountBeforeTax || 0);
            const tax = parseFloat(updated.taxPaid || 0);
            updated.totalAmount = (cost + tax).toFixed(2);
        }

        setIncome(updated);
    };
    
    return (
        <div>
            <Input
                value={income.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Category"
                placeholder="Rent, Groceries, etc"
                type="text"
            />

            <Input
                value={income.amountBeforeTax}
                onChange={({ target }) => handleChange("amountBeforeTax", target.value)}
                label="Amount Before Tax"
                placeholder=""
                type="number"
            />

             <Input
                value={income.taxPaid}
                onChange={({ target }) => handleChange("taxPaid", target.value)}
                label="Tax Paid"
                placeholder=""
                type="number"
            />

             <Input
                value={income.totalAmount}
                onChange={({ target }) => handleChange("totalAmount", target.value)}
                label="Total Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense(income)}
                >
                    Add Expense
                </button>
            </div>
        </div>
    )

}

export default AddExpenseForm;