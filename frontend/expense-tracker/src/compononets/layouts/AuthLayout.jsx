import React from 'react';
import { LuTrendingUpDown } from 'react-icons/lu';

    // AuthLayout is a reusable layout component that wraps its children
    const AuthLayout = ({ children }) => {
        return (
            <div className='flex'>
                <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
                    <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
                     {/* This is where child component (like LoginForm) will appear */}
                    {children} 
                </div>

                <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative' >
                    <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5' />
                    <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10' />
                    <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5' />

                {/* Creating the Stat info card component */}
                    <div className='relative z-20 flex flex-col items-center gap-6 flex-wrap justify-center h-full'>
                        <StatsInfoCard icon={<LuTrendingUpDown />} title="Track Expenses" desc="Track and categorize expenses" />
                        <StatsInfoCard icon={<LuTrendingUpDown />} title="Track Sales" desc="Track and categorize sales" />
                        <StatsInfoCard icon={<LuTrendingUpDown />} title="Track Profits" desc="Track profits and losses" />
                    </div>

                </div>
            </div>
        )
    };

    export default AuthLayout;

    // Define and style the Stat info card component
    const StatsInfoCard = ({ title, desc, icon }) => {
    return (
        <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md border border-gray-200/50 z-10 w-85 h-30'>
            <div className={`w-12 h-12 flex items-center justify-center text-white bg-primary rounded-full drop-shadow-xl`} >
                {icon}
            </div>
            <div className='flex flex-col justify-center'>
                <h6 className='text-xs text-gray-700 mb-1'>{title}</h6>
                <p className='text-xs text-gray-500'>{desc}</p>
            </div>
        </div>
    );
};
    

