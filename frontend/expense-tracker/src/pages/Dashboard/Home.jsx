import React, { useEffect } from 'react'
import DashboardLayout from '../../compononets/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../compononets/Cards/InfoCard';
import { LuHandCoins, LuWallet, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from '../../utils/helper';
import SalesOverview from '../../compononets/Dashboard/SalesOverview';
import ExpenseChart from '../../compononets/Dashboard/ExpenseChart';
import ProfitAndLoss from '../../compononets/Dashboard/profitAndLoss';

    const Home = () => {
        useUserAuth();

        const navigate = useNavigate();

        const [dashboardData, setDashboardData] = useState(null);
        const [loading, setLoading] = useState(false);

        // Function to fetch dashboard data from API
        const fetchDashboardData = async () => {
            if (loading) return;

            setLoading(true); 
            try {
                const response = await axiosInstance.get(
                    `${API_PATHS.DASHBOARD.GET_DATA}`
                );
        
                if (response.data) {
                    setDashboardData(response.data);
                }
            } catch (error) {
                console.log("Something went wrong. Please try again.", error)
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            // Call the function to fetch dashboard data when the component mounts
            fetchDashboardData();

             // Cleanup function (currently does nothing, but required by useEffect syntax)
            return () => {};
        }, []); 

        

        return (
            <DashboardLayout activeMenu ="Dashboard">
                <div className='my-5 mx-auto'>
                    <h1 className=''>Business Overview</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <InfoCard
                            icon={<IoMdCard />}
                            label="Total Sales"
                            value={addThousandsSeparator(dashboardData?.totalSales|| 0)}
                            color="bg-primary"
                        />

                        <InfoCard
                            icon={<LuWallet />}
                            label="Total Expense"
                            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                            color="bg-red-500"
                        />

                        <InfoCard
                            icon={<LuHandCoins />}
                            label="Total Profit"
                            value={addThousandsSeparator(dashboardData?.totalProfit || 0)}
                            color="bg-green-500"
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
                        {/* Sales Info Card */}
                        <SalesOverview
                            transaction={dashboardData?.recentSales || []}
                        />

                        {/* Expense Info Card */}
                        <ExpenseChart
                            expenses={dashboardData?.expenses || []} 
                        />

                        {/* Profit/Loss Card */}
                        <ProfitAndLoss 
                            data={dashboardData?.profitLossData || [] }
                        />
                        
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    export default Home;