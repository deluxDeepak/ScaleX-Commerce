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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <UserSidebar />

            {/* Offset content by sidebar width: 64px on mobile, 256px on lg */}
            <main className="lg:ml-64 p-3 sm:p-4 lg:p-6 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;