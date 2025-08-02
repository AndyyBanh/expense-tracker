import React from "react";
import { LuPlus } from "react-icons/lu";

const InventoryOverview = ({ inventory, onAddInventory, onDownload }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                    <h5 className="text-lg">Inventory Overview</h5>
                    <div className="flex items-cetner gap-2">
                        <button 
                            onClick={onAddInventory}
                            className="btn btn-primary bg-slate-100 text-sm px-3 py-1.5 rounded-md flex items-center gap-2"
                        >
                            <LuPlus className="w-4 h-4" />
                            Add Inventory
                        </button>
                    </div>
            </div>

            <p className="text-sm text-gray-500">
                You have <strong>{inventory?.length || 0}</strong> inventory item(s)
            </p>
        </div>
    )
}

export default InventoryOverview;