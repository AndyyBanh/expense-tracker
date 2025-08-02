export const BASE_URL = "http://localhost:8000";

// utils/apiPaths.js
// Define API endpoint paths
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`,
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    },
    SALES: {
        ADD_SALES: "/api/v1/sales/add",
        GET_ALL_SALES: "/api/v1/sales/get",
        DELETE_SALES: (salesId) => `/api/v1/sales/${salesId}`,
        DOWNLOAD_SALES: `/api/v1/sales/download`,
        UPDATE_SALES: (salesId) => `/api/v1/sales/${salesId}`,
    },
    INVENTORY: {
        ADD_INVENTORY: "/api/v1/inventory/add",
        GET_ALL_INVENTORY: "/api/v1/inventory/get",
        DELETE_INVENTORY: (inventoryId) => `/api/v1/inventory/${inventoryId}`,
        DOWNLOAD_INVENTORY: `/api/v1/inventory/download`,
        UPDATE_INVENTORY: (inventoryId) => `/api/v1/inventory/${inventoryId}`,
    }
};