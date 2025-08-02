import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor,
}) => {
    return (
        <div>
            {/* ResponsiveContainer makes the chart adapt to its parent container size */}
            <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                {/* Pie component draws the donut chart */}
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {/* Map over data to create pie slices with specific colors */}
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                {/* Tooltip displayed on hover, using a custom tooltip component */}
                <Tooltip content={CustomTooltip} />
                 {/* Legend for showing names and colors of slices */}
                <Legend content={CustomLegend } />
                {/* Conditionally render the center text inside the donut chart Only shown if `showTextAnchor` prop is true */}
                
                {showTextAnchor && (
                    <g>
                     <text
                        x="50%"
                        y="50%"
                        dy={-25}
                        textAnchor="middle"
                        fill="#666"
                        fontSize="14px"
                    >
                        {label}
                    </text>
                    <text 
                        x="50%"
                        y="50%"
                        dy={8}
                        textAnchor="middle"
                        fill="#333"
                        fontSize="24px"
                        fontWeight="semi-bold"
                    >
                        {totalAmount}
                    </text>
                    </g>
                )}
            </PieChart>
        </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;