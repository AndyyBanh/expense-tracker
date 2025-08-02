import React, { useEffect, useState } from "react";
import DashboardLayout from "../../compononets/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "../../compononets/layouts/Modal";
import AddSalesForm from "../../compononets/Sales/AddSalesForm.JSX";
import toast from "react-hot-toast";
import SalesTable from "../../compononets/Sales/SalesTable";
import DeleteAlert from "../../compononets/layouts/DeleteAlert";
import EditInventoryForm from "../../compononets/Inventory/EditInventoryForm";
import EditSaleForm from "../../compononets/Sales/EditSaleForm";
import SalesFilter from "../../compononets/Sales/SalesFilter";

const Sales = () => {
    useUserAuth();

    // State Variables
    const [salesData, setSalesData] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    
    const [openAddSalesModal, setOpenAddSalesModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    
    // API CALLs
    // Get All Sales Details
    const fetchSalesDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.SALES.GET_ALL_SALES}`
            );

            if (response.data) {
                setSalesData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    // Get All available inventory items
    const fetchInventoryItems = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INVENTORY.GET_ALL_INVENTORY);
            if (response.data) {
                const availableItems = response.data.filter(item => item.status !== "sold");
                setInventoryItems(availableItems);
            }
        } catch (error) {
        console.error("Error fetching inventory items:", error);
        }
    }

    // Handle Add sales
    const handleAddSales = async (sales) => {
        const { inventoryId, size, productName, costPrice, salePrice, date } = sales; // Destructing input extracting properties from income object

        if (!inventoryId || !productName || !costPrice || !salePrice || !date) {
            toast.error("All fields required");
            return;
        }

        try {
            // API CALL
            // Add sale record
            await axiosInstance.post(API_PATHS.SALES.ADD_SALES, {
                inventoryId,
                size,
                productName,
                costPrice,
                salePrice,
                date,
            });

            // mark inventory item a sold
            await axiosInstance.put(API_PATHS.INVENTORY.UPDATE_INVENTORY(inventoryId), {
                status: "sold",
            });

            setOpenAddSalesModal(false);
            toast.success("Sale added successfully");
            fetchSalesDetails();
            fetchInventoryItems(); 
        } catch (error) {
            console.error(
                "Error adding sales:",
                error.response?.data?.message || error.message
            );
        }
    };

    // Delete Sales
    const deleteSales = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.SALES.DELETE_SALES(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Sale details deleted successfully");
            fetchSalesDetails();
        } catch (error) {
            console.error(
                "Error deleting sale:",
                error.response?.data?.message || error.message
            );
        }
    };

    // Handle download sale details
    const handleDownloadSalesDetails = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.SALES.DOWNLOAD_SALES,
                { responseType: "blob" }
            );

            // Create blob URL
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "sales_details.xlsx");
            document.body.appendChild(link);
            link.click();
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download error:", err);
            toast.error("Failed to download sales.");
        }
    };
        
    // Handle Updating sales
    const handleUpdateSales = async (id, updates) => {
        try {
            // Send request to backend
            const response = await axiosInstance.put(API_PATHS.SALES.UPDATE_SALES(id), updates);
            // update local state only ig backend succeeds
            if (response.data) {
                setSalesData(prev =>
                    prev.map(item =>
                        item._id == id? response.data : item
                    )
                );
                toast.success("Sale updated.");
            }
        } catch (err) {
            console.error("Failed to update sale:", err);
            toast.error("Failed to update sale.");
        }
    };

    // handle edit
    const handleEdit = (sale) => {
        setEditItem(sale);
        setIsEditModalOpen(true);
    };

    // Submit Edit sale
    const handleEditSubmit = async (updatedFields) => {
        if (!editItem) return;
        await handleUpdateSales(editItem._id, updatedFields);
        setIsEditModalOpen(false);
        setEditItem(null);
    };

    // Handle Filter
    const filteredSalesData = salesData.filter((sale) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = 
            sale.productName.toLowerCase().includes(search) ||
            (sale.source && sale.source.toLowerCase().includes(search));

        const saleDate = new Date(sale.date).toISOString().split("T")[0];
        const matchesDate = dateFilter ? saleDate == dateFilter : true;

        return matchesSearch && matchesDate;
        
    })

    useEffect(() => {
        fetchSalesDetails();
        fetchInventoryItems();
        return () => {};
    }, []);

    return (
        <DashboardLayout activeMenu="Sales">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>

                    {/* Add Sale Button */}
                    <div className="flex justify-end mb-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => setOpenAddSalesModal(true)}
                        >
                            + Add Sale
                        </button>
                    </div>
                </div>

                <Modal
                    isOpen={openAddSalesModal}
                    onClose={() => setOpenAddSalesModal(false)}
                    title="Add Sale"
                >
                    <AddSalesForm 
                        onAddSales={handleAddSales} 
                        inventoryItems={inventoryItems} 
                    />
                </Modal>

                <SalesFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    onClear={() => {
                        setSearchTerm("");
                        setDateFilter("");
                    }}
                    onDownload={handleDownloadSalesDetails}
                />

                <SalesTable
                    salesData={filteredSalesData}
                    loading={loading}
                    onDelete={(sale) => setOpenDeleteAlert({ show: true, data: sale })}
                    onEdit={handleEdit}
                />

                {/* Delete Alert Modal */}
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Sale"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this item?"
                        onDelete={() => deleteSales(openDeleteAlert.data._id)}
                    />
                </Modal>

                {/* Edit Inventory Modal */}
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    title="Edit Sale"
                >
                    <EditSaleForm
                        initialData={editItem}
                        onSubmit={handleEditSubmit}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Sales;