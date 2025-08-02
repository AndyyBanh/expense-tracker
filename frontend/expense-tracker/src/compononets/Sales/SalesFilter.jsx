import React from "react";

const SalesFilter = ({ searchTerm, setSearchTerm, dateFilter, setDateFilter, onClear, onDownload}) => {
    return (
        <div className="card flex gap-4 mb-4 items-center">
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

            <button className="btn btn-primary" onClick={onDownload}>
                Download
            </button>
        </div>
    )
};

export default SalesFilter;