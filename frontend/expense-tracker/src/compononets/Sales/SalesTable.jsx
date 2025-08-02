import React from "react";
import { LuTrash2 } from "react-icons/lu";

const SalesTable = ({ salesData, loading, onDelete, onEdit }) => {
    if (loading) {
        return <div className="text-center py-8">Loading sales...</div>
    }


    if (!salesData || salesData.length === 0) {
        return <div className="text-center py-8">No sales data available.</div>
    }

    return (
        <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Product Name</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Size</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Cost Price</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Sale Price</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Profit</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Date Sold</th>
                        <th className="text-center px-4 py-2 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData.map((sale) => {
                        const profit = sale.salePrice - sale.costPrice;
                        const profitClass = profit < 0 ? "text-red-600" : "text-green-600"
                        return (
                        <tr key={sale._id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{sale.productName}</td>
                            <td className="px-4 py-3 text-sm">{sale.size}</td>
                            <td className="px-4 py-3 text-sm">{sale.costPrice.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm">{sale.salePrice.toFixed(2)}</td>
                            <td className={`px-4 py-3 ${profitClass}`}>${profit.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm">{new Date(sale.date).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-center space-x-4">
                                <button
                                    onClick={() => onDelete(sale)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete Sale"
                                >
                                    <LuTrash2 size={18} />
                                </button>

                                <button
                                    onClick={() => onEdit(sale)}
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
};

export default SalesTable;