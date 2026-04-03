import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    MapPin,
    ShoppingCart
} from "lucide-react";
import { NavLink } from "react-router-dom";

const sidebar = [
    { name: "Dashboard", link: "/user/dashboard", icon: LayoutDashboard },
    { name: "Wishlist", link: "/user/wishlist/product", icon: Package },
    { name: "Orders", link: "/user/orders/product", icon: ShoppingBag },
    { name: "Saved Address", link: "/user/saveAdress", icon: MapPin },
    { name: "Cart", link: "/user/cart/product", icon: ShoppingCart },
];

const UserSidebar = () => {
    return (
        <aside className="fixed top-0 left-0 h-screen w-14 lg:w-64 bg-white z-40 flex flex-col">
            <nav className="flex flex-col gap-1 p-2 lg:p-4 mt-16">
                {sidebar.map((s) => {
                    const Icon = s.icon;
                    return (
                        <NavLink
                            key={s.link}
                            to={s.link}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg text-sm transition-colors
                                ${isActive
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <div className="flex-rows lg:flex  ">
                                <Icon size={18} className="shrink-0" />
                                <span className=" lg:block truncate">{s.name}</span>
                            </div>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default UserSidebar;