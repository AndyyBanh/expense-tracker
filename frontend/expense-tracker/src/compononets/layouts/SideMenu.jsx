import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

// SideMenu component receives the currently active menu item as a prop
const SideMenu = ({ activeMenu }) => {
    // Destructuring user data and a method to clear the user from context
    const { user, clearUser } = useContext(UserContext);
    
    // Initialize navigate function from React Router
    const navigate = useNavigate();

    // Function to handle menu button clicks
    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        // Navigate to the clicked route
        navigate(route);
    };

    // Function to handle logout logic
    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

   // Styling
   return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/5 p-5 sticky top-[61px] z-20">
         {/* User profile section */}
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
            {/* Render profile image if available */}
            {user?.profileImageUrl ? (
                <img
                    src={user?.profileImageUrl || ""}
                    alt="Profile"
                    className="w-20 h-20 bg-slate-400 rounded-full"
                  />
                ) : (
                    <CharAvatar
                        fullName={user?.fullName}
                        width="w-20"
                        height="h-20"
                        style="text-xl"
                    />
                    )}
            {/* Display user's full name if it is there by using optional chaining */}
            <h5 className="text-gray-950 font-medium leading-6">
                {user?.fullName || ""}
            </h5>
        </div>

        {/* Render menu items dynamically from data */}
        {SIDE_MENU_DATA.map((item, index) => (
            <button
                key={`menu_${index}`}
                className={`w-full flex items-center gap-4 text-[15px] ${
                    activeMenu == item.label ? "text-white bg-primary" : ""
                } py-3 px-6 rounded-lg mb-3`}
                onClick={() => handleClick(item.path)} // Handle navigation or logout
            >
                <item.icon className="text-xl" />
                {item.label}
            </button>
        ))}
    </div>
    );

}

export default SideMenu;