import React, { useState } from "react";
import { LuTrash2 } from "react-icons/lu"

const InventoryTable = ({ inventory = [], onDelete, onUpdateInventory, onViewNotes, onEdit }) => {
    if (!inventory.length) {
        return <p className="text-sm text-gray-500 mt-4">No inventory data available</p>
    }
    
    return (
        <div className="card p-4 overflow-x-auto">
            <table className="min-w-full text-sm text-left">
                <thead>
                    <tr className="border-b text-gray-600">
                        <th className="py-2 px-3">Product Name</th>
                        <th className="py-2 px-3">Cost Before Tax</th>
                        <th className="px-4 py-2 text-left">Tax Paid</th>
                        <th className="py-2 px-3">Quantity</th>
                        <th className="py-2 px-3">Size</th>
                        <th className="py-2 px-3">Total</th>
                        <th className="py-2 px-3">Status</th>
                        <th className="py-2 px-2">Payment Methods</th>
                        <th className="py-2 px-2">Condition</th>
                        <th className="py-2 px-3">Date Purchased</th>
                        <th className="py-2 px-3">Notes</th>
                        <th className="py-2 px-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item._id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-3">{item.productName}</td>
                                <td className="py-2 px-3">{item.costBeforeTax?.toFixed(2)}</td>
                                <td className="px-4 py-2">${item.taxPaid?.toFixed(2) || "0.00"}</td>
                                <td className="py-2 px-3">{item.quantity || 1}</td>
                                <td className="py-2 px-3">{item.size}</td>
                                <td className="py-2 px-3">
                                      ${(((item.costBeforeTax || 0) * (item.quantity || 1)) + (item.taxPaid || 0)).toFixed(2)}
                                </td>
                                <td className="py-2 px-3">
                                    <select
                                        value={item.status}
                                        onChange={({ target }) => onUpdateInventory(item._id, { status: target.value })}
                                        className="border rounded-full px-2 py-1 text-sm"
                                    >
                                        <option value="available">Available</option>
                                        <option value="sold">Sold</option>
                                        <option value="reserved">Reserved</option>
                                    </select>
                                </td>
                                <td className="py-2 px-3">
                                    {item.paymentMethod}
                                </td>
                                <td className="py-2 px-3">
                                    {item.condition}
                                </td>
                                <td className="py-2 px-3">
                                    {new Date(item.date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-3">
                                    {item.notes? (
                                        <button 
                                            onClick={() => onViewNotes(item.notes)}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            View
                                        </button>
                                    ): (
                                        <span className="text-gray-400 text-sm">-</span>
                                    )}
                                </td>
                                <td className="py-2 px-3 text-right space-x-4">
                                    <button
                                        onClick={() => onDelete(item._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <LuTrash2 className="w-4 h-4" />
                                    </button>

                                    <button 
                                        onClick={() => onEdit(item)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Edit
                                    </button>
                                </td>
                        </tr>

                    ))}
                    
                </tbody>
            </table>

        </div>
    )
}

export default InventoryTable;