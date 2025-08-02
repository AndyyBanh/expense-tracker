import React, { useEffect, useState } from "react";
import CustomLineChart from "../Charts/CustomLineChart";
import { prepareSalesLineChartData } from "../../utils/helper";


const SalesOverview = ({ transaction }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareSalesLineChartData(transaction)
        setChartData(result);
        
        return () => {};
    }, [transaction])


    return (
        <div className="card">
            <h5 className="text-lg">Sales</h5>
            <div className="mt-10">
                <CustomLineChart 
                    data={chartData}
                />
            </div>
            
        </div>
    )
};

export default SalesOverview;