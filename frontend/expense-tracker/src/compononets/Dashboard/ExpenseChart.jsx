import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#00C49F", "#FFBB28"];

const ExpenseChart = ({ expenses }) => {
    // Convert expenses [{c category, totalAmount }] to pieData [{ name, amount }]
    const pieData = expenses.map((item) => ({
        name: item.category,
        amount: item.totalAmount,
    }));

    const totalExpense = pieData.reduce((sum, item) => sum + item.amount, 0)

    return (
        <div className="card">
            <h5 className="text-lg">Expenses</h5>
            <div className="mt-10">
                <CustomPieChart 
                    data={pieData}
                    label="Total Expenses"
                    totalAmount={`$${totalExpense}`}
                    colors={COLORS}
                    showTextAnchor={true}
                />
            </div>
        </div>
    )
};

export default ExpenseChart;