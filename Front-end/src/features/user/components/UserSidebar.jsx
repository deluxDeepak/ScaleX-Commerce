import {
    LayoutDashboard,
    Heart,
    ShoppingBag,
    MapPin,
    ShoppingCart
} from "lucide-react";
import { NavLink } from "react-router-dom";

const sidebar = [
    { name: "Dashboard", link: "/user/dashboard", icon: LayoutDashboard },
    { name: "Wishlist", link: "/user/wishlist/product", icon: Heart },
    { name: "Orders", link: "/user/orders/product", icon: ShoppingBag },
    { name: "Saved Address", link: "/user/saveAdress", icon: MapPin },
    { name: "Cart", link: "/user/cart/product", icon: ShoppingCart },
];

const UserSidebar = () => {
    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-gray-100 flex flex-col shadow-sm transform -translate-x-full lg:translate-x-0 transition-transform duration-300">
            <nav className="flex flex-col lg:gap-1 lg:p-4  lg:mt-20">
                {sidebar.map((s) => {
                    const Icon = s.icon;
                    return (
                        <NavLink
                            key={s.link}
                            to={s.link}
                            className={({ isActive }) =>
                                `flex items-center justify-center lg:justify-start gap-3 p-3 lg:px-4 lg:py-3 rounded-xl text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                                }`
                            }
                        >
                            <Icon size={20} className="shrink-0" />
                            <span className="hidden lg:block truncate">{s.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default UserSidebar;