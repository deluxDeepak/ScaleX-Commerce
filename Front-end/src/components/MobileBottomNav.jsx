import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";

// Mobile navigation 
const MobileBottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems = [] } = useCart();
    const cartCount = cartItems.length || 0;

    const navItems = [
        { key: "home", label: "Home", icon: Home, path: "/" },
        { key: "category", label: "Category", icon: Heart, path: "/products" },
        // Cart should go to the user cart route, not be treated as a productId under /products
        { key: "cart", label: "Cart", icon: ShoppingCart, path: "/user/cart/product", badge: cartCount },
        { key: "account", label: "Account", icon: User, path: "/user" },
    ];

    const isActive = (path) =>
        location.pathname === path || location.pathname.startsWith(`${path}/`);

    return (
        <nav className="sm:hidden fixed inset-x-0 bottom-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-[0_-6px_16px_rgba(15,23,42,0.08)]">
            <div className="max-w-3xl mx-auto px-3 py-2.5 pb-3 flex items-center justify-between gap-1.5">
                {navItems.map(({ key, label, icon: Icon, path, badge }) => {
                    const active = isActive(path);
                    return (
                        <button
                            key={key}
                            onClick={() => navigate(path)}
                            className={`flex-1 flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${active ? "text-blue-600" : "text-gray-500"
                                }`}
                            aria-label={label}
                        >
                            <div
                                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-200 ${active
                                    ? "bg-blue-50 border-blue-100 shadow-sm text-blue-600"
                                    : "bg-gray-50 border-gray-100 text-gray-600"
                                    }`}
                            >
                                <Icon size={20} />
                                {badge > 0 && key === "cart" && (
                                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                                        {badge > 99 ? "99+" : badge}
                                    </span>
                                )}
                            </div>
                            <span>{label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileBottomNav;
