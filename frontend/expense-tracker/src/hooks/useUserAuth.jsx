import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext"
import { useContext, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// Custom hook to check and fetch user authentication info
export const useUserAuth = () => {
    // Access user state and updater functions from context
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) return;
        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error){
                console.error("Failed to fetch user info:", error);
                // If still mounted, clear user context and redirect to login page
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };
        // Call the async function
        fetchUserInfo();

        // Cleanup function to avoid updating state after unmount
        return () =>{
            isMounted = false;
        };
    }, [updateUser, clearUser, navigate]); // Dependencies: run effect when any of these change
};
