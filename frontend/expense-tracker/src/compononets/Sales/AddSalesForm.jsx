import React, { useState } from "react";
import Input from "../Inputs/Input";

const AddSalesForm = ({onAddSales, inventoryItems}) => {
    const [sales, setSales] = useState({
        inventoryId: "",
        productName: "",
        size: "",
        costPrice: "",
        salePrice: "",
        date: "",
    });

    const handleChange = (key, value) => {
        setSales(prev => ({ ...prev, [key]: value}));
    };

    const handleInventorySelect = (e) => {
        const selectedId = e.target.value;
        const selectedItem = inventoryItems.find(item => item._id === selectedId);

        if (selectedItem) {
            setSales({
                ...sales,
                inventoryId: selectedItem._id,
                productName: selectedItem.productName,
                size: selectedItem.size,
                costPrice: selectedItem.totalCost,
            });
        }
    };

    return (
        <div className="space-y-4">
             {/* Inventory Dropdown */}
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Inventory Item</label>
                <select
                    value={sales.inventoryId}
                    onChange={handleInventorySelect}
                    className="w-full border rounded-md p-2"
                >
                    <option value="">-- Select --</option>
                    {inventoryItems.map(item => (
                        <option key={item._id} value={item._id}>
                            {item.productName} (Cost: ${item.totalCost})
                        </option>
                    ))}
                </select>
             </div>

            {/* Read-only fields auto-filled */}
            <Input
                value={sales.productName}
                onChange={() => {}}
                label="ProductName"
                type="text"
                readOnly
            />

            <Input
                value={sales.costPrice}
                onChange={() => {}}
                label="Cost Price"
                type="number"
                readOnly
            />
            {/* Sale Price + Date */}
            <Input
                value={sales.salePrice}
                onChange={({ target }) => handleChange("salePrice", target.value)}
                label="SalePrice"
                placeholder=""
                type="number"
            />
            <Input
                value={sales.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={()=>onAddSales(sales)}
                >
                    Add Sale
                </button>
            </div>
        </div>
    )
}

export default AddSalesForm;