import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
    LuBox,
} from "react-icons/lu";

import { AiOutlineStock } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { lazy } from "react";

// exporting an array of objects for sidebar menu
export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense",
    },
    {
        id: "04",
        label: "Inventory",
        icon: LuBox,
        path: "/inventory",
    },
    {
        id: "06",
        label: "Sales",
        icon: AiOutlineStock,
        path: "/sales",
    },
    {
        id: "08",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },
    
];