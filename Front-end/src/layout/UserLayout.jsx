import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../features/user/components/UserSidebar";
import { useLayout } from "../context/useLayout";

// Jab user layout mount tab hide kar do footer ko 
const UserLayout = () => {
    const { setShowFooter } = useLayout()

    useEffect(() => {
        setShowFooter(false)         // mount pe hide
        return () => setShowFooter(true)  // unmount pe wapas show
    }, [])


    return (
        <div className="flex">

            {/* Sidebar - normal flow, sticky */}
            <div className="w-10 lg:w-64 sticky top-16 h-[calc(100vh-4rem)] shrink-0">
                <UserSidebar />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 min-w-0">
                <Outlet />
            </div>

        </div>
    );
};
export default UserLayout
