import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

// Custom tooltip with 2 decimal places
const CustomToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border rounded shadow text-sm">
                <p className="font-semibold">{label}</p>
                <p className="text-green-700">
                    Profit: ${payload[0].value.toFixed(2)}
                </p>
                <p className="text-red-600">
                    Expense: ${payload[1].value.toFixed(2)}
                </p>
            </div>
        );
    }
    return null;
}

const SideBarChart = ({ data }) => {
    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomToolTip />} />
                    <Legend />
                    <Bar dataKey="profit" fill="#4ade80" name="Profit" />
                    <Bar dataKey="expense" fill="#f87171" name="Expense" />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
};

export default SideBarChart;