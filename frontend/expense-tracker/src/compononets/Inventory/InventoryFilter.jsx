import React from "react";

const InventoryFilter = ({ searchTerm, setSearchTerm, dateFilter, setDateFilter, onClear, onDownload }) => {
    return (
        <div className="card flex justify-between items-center mb-4 p-4 gap-3">
            <h2 className="font-semibold">Filter:</h2>
            <input
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered border rounded px-2"
            />

            <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input input-bordered px-2"
            />

            <button className="btn btn-secondary" onClick={onClear}>
                Clear Filters
            </button>

            <button className="btn rounded-md btn-primary" onClick={onDownload} >
                Download
            </button>
        </div>
    )
};

export default InventoryFilter;