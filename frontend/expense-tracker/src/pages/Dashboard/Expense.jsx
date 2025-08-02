import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../compononets/Expense/ExpenseOverview';
import DashboardLayout from '../../compononets/layouts/DashboardLayout';
import AddExpenseForm from '../../compononets/Expense/AddExpenseForm';
import Modal from '../../compononets/layouts/Modal';
import DeleteAlert from '../../compononets/layouts/DeleteAlert';
import ExpenseTable from '../../compononets/Expense/ExpenseTable';

    const Expense = () => {
        useUserAuth();

        const [expenseData, setExpenseData] = useState([]);
            const [loading, setLoading] = useState(false);
            const [openDeleteAlert, setOpenDeleteAlert] = useState({
                show: false,
                data: null,
            });

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

     // Get All Expense Details
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
            );

            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Add Expense
    const handleAddExpense = async (expense) => {
        const { category, amountBeforeTax, date, icon, taxPaid, totalAmount } = expense; // Destructing input extracting properties from expense object

        // Validation Checks
        if (!category.trim()) {
            toast.error("Category is required.")
            return;
        }

        if (!amountBeforeTax || isNaN(amountBeforeTax) || Number(amountBeforeTax) <=0) {
            toast.error("Amount before tax should be valid number greater than 0.")
        }

        if (!date) {
            toast.error("Date is required.");
            return;
        }

        try {
            // API CALL
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amountBeforeTax,
                taxPaid,
                totalAmount,
                date,
                icon,
            });
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error(
                "Error adding expense:",
                error.response?.data?.message || error.message
            );
        }
    };

    // Delete Expense
    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense details deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error(
                "Error deleting expense:",
                error.response?.data?.message || error.message
            );
        }
    };
        

    // Handle download expense details
    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(
            API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
            {
                responseType: "blob",
            }
        );

            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading expense details:", error);
            toast.error("Failed to download expense details. Please try again.");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();

        return () => {};
    }, []);

        return (
             <DashboardLayout activeMenu ="Expense">
                <div className='my-5 mx-auto'>
                    <div className='grid grid-cols-1 gap-6'>
                        <div className=''>
                            <ExpenseOverview
                                transactions={expenseData}
                                onExpenseIncome={() => setOpenAddExpenseModal(true)}
                            />
                        </div>
                    </div>
                    <button 
                        className='btn btn-primary'
                        onClick={handleDownloadExpenseDetails}
                    >
                        Download Expenses
                    </button>

                    <ExpenseTable 
                        expenseData={expenseData}
                        loading={loading}
                        onDelete={(expense) => setOpenDeleteAlert({ show: true, data: expense })}
                    />
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure you weant to delete this expense detail?"
                            onDelete={() => deleteExpense(openDeleteAlert.data._id)}
                        />
                    </Modal>

                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm onAddExpense={handleAddExpense} />
                    </Modal>
                </div>
            </DashboardLayout>
        )
    }
    
    export default Expense;