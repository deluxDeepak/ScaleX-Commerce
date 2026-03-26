import React, { useState } from 'react'
// import Searchbar from './Searchbar';

import { User, Heart, ShoppingCart, ChevronDown, Menu, X, Bell } from 'lucide-react';
import Searchbar from '../../../components/Searchbar';

const SellerHeader = ({toggelesidebar,isSidebarOpen}) => {

    const [search, setSearch] = useState("");
    //isko searchresult me use karna hai 
    const onChange = (e) => {
        setSearch(e.target.value);
    }

    // Yehan se api call kar sakte hai --best way hai header sirf input hai 
    const onSearch = () => {

        console.log("Search value is ", search);
        setSearch("");
    }

    // Mobile menu toggle
    // const [isOpen, setIsOpen] = useState(true);


    return (
        <header className="bg-white w-full shadow-sm sticky top-0 z-50 border-b border-gray-100">

            {/* ===== Main Header Row ===== */}
            <div className=" px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

                <button
                    className={` p-2.5 rounded-xl hover:bg-gray-50 transition-colors`}
                    onClick={toggelesidebar}
                    aria-label="Menu"
                >
                    {isSidebarOpen ? <Menu size={20} className="text-gray-600" /> : <X size={20} className="text-gray-600" />}
                </button>


                {/* Logo and Title */}
                <div
                    className="flex items-center gap-2 cursor-pointer shrink-0"
                >
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-blue-100">

                    </div>
                    <div className="flex flex-col leading-tight">
                        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight leading-none">Shopify</h1>
                        <span className="text-[10px] text-blue-500 font-semibold tracking-widest uppercase">Store</span>
                    </div>
                </div>



                {/* Searchbar — center */}
                <div className="hidden sm:flex flex-1 max-w-xl mx-4">
                    <Searchbar
                        value={search}
                        placeholder={"Search for products, brands & more..."}
                        onChange={onChange}
                        onSearch={onSearch}
                    />
                </div>

                {/* Icons — right side */}
                <div className="flex items-center gap-1 shrink-0">

                    {/* Notification button  */}
                    <button
                        className="hidden sm:flex p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                        aria-label="Wishlist"
                    >
                        <Bell size={20} className="text-gray-500 group-hover:text-red-500 transition-colors" />
                    </button>



                    {/* Profile */}
                    <button
                        className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors group"
                        aria-label="Profile"
                    >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
                            <User size={14} className="text-white" />
                        </div>
                        <span className="hidden md:block text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Account</span>
                        <ChevronDown size={13} className="hidden md:block text-gray-400" />
                    </button>

                </div>
            </div>

            {/* ===== Mobile Search Row ===== */}
            <div className="sm:hidden px-4 pb-3">
                <Searchbar
                    value={search}
                    placeholder={"Search products..."}
                    onChange={onChange}
                    onSearch={onSearch}
                />
            </div>
        </header>
    );
}

export default SellerHeader