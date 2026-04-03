import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../features/user/components/UserSidebar";
import { useLayout } from "../context/useLayout";

const UserLayout = () => {
    const { setShowFooter } = useLayout();

    useEffect(() => {
        setShowFooter(false);
        return () => setShowFooter(true);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <UserSidebar />

            {/* Offset content by sidebar width: 56px on mobile, 256px on lg */}
            <main className="ml-14 lg:ml-64 p-4 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;