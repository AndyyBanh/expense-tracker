import React from "react";
import SideBarChart from "../Charts/sideBarChart";

const ProfitAndLoss = ({ data }) => {
    return (
        <div className="card">
            <h5 className="text-lg">Profit and Loss</h5>
            <div className="mt-10">
                <SideBarChart 
                    data={data}
                />

            </div>
        </div>
    )
};

export default ProfitAndLoss;