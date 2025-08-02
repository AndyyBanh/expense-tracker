import React, { useEffect, useState } from "react";
import DashboardLayout from "../../compononets/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import InventoryOverview from "../../compononets/Inventory/InventoryOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { data } from "react-router-dom";
import InventoryTable from "../../compononets/Inventory/InventoryTable";
import Modal from "../../compononets/layouts/Modal";
import AddInventoryForm from "../../compononets/Inventory/AddInventoryForm";
import DeleteAlert from "../../compononets/layouts/DeleteAlert";
import axios from "axios";
import EditInventoryForm from "../../compononets/Inventory/EditInventoryForm";
import InventoryFilter from "../../compononets/Inventory/InventoryFilter";

const Inventory = () => {
    useUserAuth();
    // State Variables
    const [inventoryData, setInventoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });
    const [selectedNote, setSelectedNote] = useState("");
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

    const [editItem, setEditItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    // API Calls
    // Get All Inventory Details
    const fetchInventory = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.INVENTORY.GET_ALL_INVENTORY}`
            );
            if (response.data) {
                setInventoryData(response.data);
            }
        } catch (err) {
             console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Add Inventory
    const handleAddInventory = async (data) => {
        try {
            await axiosInstance.post(API_PATHS.INVENTORY.ADD_INVENTORY, data);
            toast.success("Item added to inventory.");
            setOpenAddModal(false);
            fetchInventory();
        } catch (err) {
            console.error("Error adding inventory:", err);
            toast.error("Failed to add inventory.");
        }
    };

    // Handle Delete Inventory
    const handleDeleteInventory = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INVENTORY.DELETE_INVENTORY(id));
            toast.success("Inventory item deleted.");
            setOpenDeleteAlert({ show: false, data: null });
            fetchInventory();
        } catch (err) {
            console.error("Error deleting inventory:", err);
            toast.error("Failed to delete inventory item.");
        }
    };

    // Handle Download Inventory
    const handleDownloadInventory = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INVENTORY.DOWNLOAD_INVENTORY, {
                responseType: "blob",
            });
            // Create blob URL
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "inventory_details.xlsx");
            document.body.appendChild(link);
            link.click();
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download error:", err);
            toast.error("Failed to download inventory.");
        }
    };

    // Handle Updating Inventory
    const handleUpdateInventory = async (id, updates) => {
        try {
            // Send request to backend
            const response = await axiosInstance.put(API_PATHS.INVENTORY.UPDATE_INVENTORY(id), updates);
            // Update local state only if backend succeeds
            if (response.data) {
                setInventoryData(prev => 
                        prev.map(item => 
                                item._id == id ? response.data : item
                        )
                );
                toast.success("Inventory updated.");
            }
        } catch (err) {
            console.error("Failed to update inventory:", err);
            toast.error("Failed to update inventory.");
        }
    };

    // Handle Viewing Notes
    const handleViewNotes = (note) => {
        setSelectedNote(note);
        setIsNoteModalOpen(true);
    };

    // Handle Edit Inventory
    const handleEdit = (item) => {
        setEditItem(item);
        setIsEditModalOpen(true);
    };

    // Submit Edit Inventory
    const handleEditSubmit = async (updatedFields) => {
        if (!editItem) return;
        await handleUpdateInventory(editItem._id, updatedFields);
        setIsEditModalOpen(false);
        setEditItem(null);
    };

    // Handle filter
    const filteredInventoryData = inventoryData.filter((inventory) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = 
            inventory.productName.toLowerCase().includes(search) ||
            (inventory.source && inventory.source.toLowerCase().includes(search));

        const inventoryDate = new Date(inventory.date).toISOString().split("T")[0];
        const matchesDate = dateFilter ? inventoryDate == dateFilter : true;

        return matchesSearch && matchesDate;
    })

    useEffect(() => {
        fetchInventory();
    }, []);


    return (
        <DashboardLayout activeMenu="Inventory">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <InventoryOverview 
                            inventory={inventoryData}
                            onAddInventory={() => setOpenAddModal(true)}
                        />

                        <InventoryFilter
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            dateFilter={dateFilter}
                            setDateFilter={setDateFilter}
                            onClear={() => {
                                setSearchTerm("");
                                setDateFilter("");
                            }}
                            onDownload={handleDownloadInventory}
                        />
                        <InventoryTable
                            inventory={filteredInventoryData}
                            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                            onDownload={handleDownloadInventory}
                            onUpdateInventory={handleUpdateInventory}
                            onViewNotes={handleViewNotes}
                            onEdit={handleEdit}
                        />
                    </div>
                    {/* Add Inventory Modal */}
                    <Modal 
                        isOpen={openAddModal}
                        onClose={() => setOpenAddModal(false)}
                        title="Add Inventory"
                    >
                        <AddInventoryForm onAddInventory={handleAddInventory} />
                    </Modal>
                    {/* Delete Alert Modal */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Inventory"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this item?"
                            onDelete={() => handleDeleteInventory(openDeleteAlert.data)}
                        />
                    </Modal>
                    {/* View Notes Modal */}
                    <Modal
                        isOpen={isNoteModalOpen}
                        onClose={() => setIsNoteModalOpen(false)}
                        title="Inventory Notes"
                    >
                        <div className="text-sm text-gray-800 whitespace-pre-line">
                            {selectedNote || "No notes available."}
                        </div>
                    </Modal>

                    {/* Edit Inventory Modal */}
                    <Modal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        title="Edit Inventory"
                    >
                        <EditInventoryForm
                            initialData={editItem}
                            onSubmit={handleEditSubmit}
                        />
                    </Modal>
                </div>
            </div>

        </DashboardLayout>
    )
}

export default Inventory;