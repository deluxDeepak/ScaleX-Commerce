import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
// import StoreHeader from '../features/store/components/StoreHeader'
import StoreHeader from '../components/StoreHeader'

// import StoreFooter from '../features/store/components/StoreFooter'
import StoreFooter from '../components/StoreFooter'
import MobileBottomNav from '../components/MobileBottomNav'

import ScrollTop from '../components/ScrollTop'
import { useLayout } from '../context/useLayout'
import LoadingSpinner from '../components/LodingSpinner'

// Only layout hai - dont wrap in div  
const MainLayout = () => {

    const { showFooter } = useLayout();
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header of the Store  */}
            <ScrollTop />
            <StoreHeader />

            <Suspense fallback={<LoadingSpinner />}>
                <main className="flex-1 pb-20 sm:pb-0">
                    <Outlet />
                </main>
            </Suspense>

            <MobileBottomNav />

            {showFooter && <StoreFooter />}
        </div>
    )
}

export default MainLayout