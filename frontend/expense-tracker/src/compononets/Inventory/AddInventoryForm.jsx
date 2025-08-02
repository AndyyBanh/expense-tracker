import React, { useState } from "react";
import Input from "../Inputs/Input";

const AddInventoryForm = ({onAddInventory}) => {
    const [inventory, setInventory] = useState({
        productName: "",
        costBeforeTax: "",
        taxPaid: "",
        totalCost: "",
        size: "",
        condition: "",
        paymentMethod: "",
        status: "available",
        notes: "",
        date: "",
    });

    const handleChange = (key, value) => {
        let updated = {...inventory, [key]: value};

        // Update totalCost if taxPaid or CostBeforeTax changes
        if (key === "costBeforeTax" || key === "taxPaid") {
            const cost = parseFloat(updated.costBeforeTax || 0);
            const tax = parseFloat(updated.taxPaid || 0);
            updated.totalCost = (cost + tax).toFixed(2);
        }

        setInventory(updated);
    };

    
    return (
        <div className="space-y-4">
            <Input
                value={inventory.productName}
                onChange={({ target }) => handleChange("productName", target.value)}
                label="Product Name"
                placeholder="e.g Air Max 97"
                type="text"
            />

            <Input
                value={inventory.costBeforeTax}
                onChange={({ target }) => handleChange("costBeforeTax", target.value)}
                label="Cost Before Tax"
                placeholder=""
                type="number"
            />

            <Input
                value={inventory.taxPaid}
                onChange={({ target }) => handleChange("taxPaid", target.value)}
                label="Tax Paid"
                placeholder=""
                type="number"
            />

            <Input
                value={inventory.totalCost}
                onChange={({ target }) => handleChange("totalCost", target.value)}
                label="Total Cost"
                placeholder=""
                type="number"
            />

            <Input
                value={inventory.size}
                onChange={({ target }) => handleChange("size", target.value)}
                label="Size"
                placeholder="US 10"
                type="text"
            />

            <Input
                value={inventory.condition}
                onChange={({ target }) => handleChange("condition", target.value)}
                label="Conditon"
                placeholder="Brand New"
                type="text"
            />

            <Input
                value={inventory.paymentMethod}
                onChange={({ target }) => handleChange("paymentMethod", target.value)}
                label="Payment Method"
                placeholder="Main Debit"
                type="text"
            />
            <div>
                <label className="block mb-1 text-sm font-medium">Status</label>
                <select
                    value={inventory.status}
                    onChange={({ target }) => handleChange("status", target.value)}
                    className="input-field"
                >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="reserved">Reserved</option>
                </select>
            </div>


            <Input
                value={inventory.notes}
                onChange={({ target }) => handleChange("notes", target.value)}
                label="Notes (optional)"
                placeholder=""
                type="text"
            />

            <Input
                value={inventory.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Purchase Date"
                placeholder=""
                type="date"
            />
            
            <div className="flex justify-end pt-4">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddInventory(inventory)}
                >
                    Add Inventory
                </button>
            </div>
        </div>
    );
};


export default AddInventoryForm;