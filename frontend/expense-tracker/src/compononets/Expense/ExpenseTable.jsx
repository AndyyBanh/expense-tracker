import React from "react";
import { LuTrash2 } from "react-icons/lu";

const ExpenseTable = ({ expenseData, loading, onDelete }) => {
    if (loading) {
        return <div className="text-center py-8">Loading expenses...</div>
    }

    if (!expenseData || expenseData.length === 0) {
        return <div className="text-center py-8">No expense data available</div>
    }

    return (
        <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Expense Category</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Amount Before Tax</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Tax Paid</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Total Amount</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Date</th>
                        <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenseData.map((expense) => (
                         <tr key={expense._id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{expense.category}</td>
                            <td className="px-4 py-3 text-sm">${expense.amountBeforeTax.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm">${expense.taxPaid.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm">${(expense.amountBeforeTax + expense.taxPaid).toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm">{new Date(expense.date).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-sm">
                                <button
                                    onClick={() => onDelete(expense)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete Expense"
                                >
                                    <LuTrash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseTable;