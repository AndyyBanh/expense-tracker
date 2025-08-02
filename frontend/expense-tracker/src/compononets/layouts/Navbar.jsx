import React, { use, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({activeMenu}) =>{
    // State control visibility of side menu on mobile view initally its closed (false)
        const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
            <button
            className="block lg:hidden text-black"
            // Toggle Side Menu Visibility
            onClick={() => {
                setOpenSideMenu(!openSideMenu);
            }}
          >
            {/* Show close icon if menu is open, otherwisde hamburger icon */}
            {openSideMenu ? (
                <HiOutlineX className="text-2xl" />
            ) : (
                <HiOutlineMenu className="text-2xl" />
            )}
            </button>

            <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

            {/* Conditionally render the SideMenu for mobile if open */}
            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white">
                    {/* Pass activeMenu to highlight the correct section */}
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    )
}

export default Navbar;