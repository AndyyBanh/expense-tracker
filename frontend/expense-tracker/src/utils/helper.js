import moment from "moment";
import { data } from "react-router-dom";

// add utlity and helper functions
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// get Initials function
export const getInitials = (name) => {
    if (!name) return "";

    // Split first and last name
    const words = name.split(" ");
    let initials = "";

    // Take first letter of two words
    for (let i=0; i < Math.min(words.length, 2); i ++) {
        initials += words[i][0];
    }
    // Return initials in uppercase
    return initials.toUpperCase();
}

// Function to format number
export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

// Helper function that takes array of expense objects and transforms it into a simpler array of objects for barchart
export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));

    return chartData;
};

// Helper function that prepares income data for bar chart
export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }));
    return chartData;
};

// helper function that prepares expense data for line chart
export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.totalAmount,
        category: item?.category,
    }));

    return chartData;
};

// helper function that prepares sales data for line chart
export const prepareSalesLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.salePrice,
        category: item?.productName,
    }));

    return chartData;
}

