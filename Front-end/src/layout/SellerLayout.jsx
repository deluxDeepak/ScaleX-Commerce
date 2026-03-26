import React, { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarSeller from '../features/seller/components/SidebarSeller'
import SellerHeader from '../features/seller/components/Sellerheader'

const SellerLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50">

            {/* Header */}
            <SellerHeader
                toggelesidebar={() => setIsSidebarOpen((prev) => !prev)}
                isSidebarOpen={isSidebarOpen}
            />

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <SidebarSeller isSidebarOpen={isSidebarOpen} />

                {/* Content */}
                <Suspense
                    fallback={
                        <div className="p-6 text-sm text-gray-500">
                            Loading page...
                        </div>
                    }
                >
                    <main className="flex-1 overflow-y-auto">
                        <Outlet />
                    </main>
                </Suspense>

            </div>

        </div>
    )
}

export default SellerLayout