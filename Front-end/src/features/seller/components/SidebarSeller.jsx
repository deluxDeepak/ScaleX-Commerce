import { NavLink } from "react-router-dom";
import UserProfile from "./UserProfile";
import { userProfile1 } from "../../../assets";
import { LayoutDashboard, Package, ShoppingBag, ChevronRight } from "lucide-react";

const SidebarSeller = ({ isSidebarOpen }) => {

    const sidebar = [
        { name: "Dashboard", link: "/seller/dashboard", icon: LayoutDashboard },
        { name: "Products",  link: "/seller/product",   icon: Package },
        { name: "Orders",    link: "/seller/order",     icon: ShoppingBag },
        { name: "Add Products",    link: "/seller/addProduct",     icon: ShoppingBag },
    ];

    const user = {
        id: 1,
        name: "Deepak",
        location: "Ghaziabad",
        isverified: true,
        image: userProfile1,
    };

    return (
        <aside className={`flex flex-col min-h-screen sticky top-0 bg-white border-r border-gray-100 shadow-sm overflow-hidden transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "w-64 md:w-72 opacity-100" : "w-0 opacity-0"}`
        }>

            {/* User Profile */}
            <div className="border-b border-gray-100 min-w-[256px] md:min-w-[288px]">
                <UserProfile user={user} />
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1 p-3 flex-1 min-w-[256px] md:min-w-[288px]">
                {sidebar.map((s) => {
                    const Icon = s.icon;
                    return (
                        <NavLink
                            key={s.link}
                            to={s.link}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group border
                                ${isActive
                                    ? "bg-blue-50 text-blue-600 border-blue-100"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 border-transparent"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon size={17} className={isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-600"} />
                                    <span className="flex-1">{s.name}</span>
                                    <ChevronRight size={14} className={`transition-opacity ${isActive ? "opacity-40" : "opacity-0 group-hover:opacity-30"}`} />
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 min-w-[256px] md:min-w-[288px]">
                <p className="text-xs text-gray-300 text-center">Seller Dashboard v1.0</p>
            </div>

        </aside>
    );
};

export default SidebarSeller;