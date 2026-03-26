
import { LayoutDashboard, Package, ShoppingBag, ChevronRight } from "lucide-react";
import SidebarUi from "../../../components/ui/SidebarUi";

const UserSidebar = () => {

    const sidebar = [
        { name: "Dashboard", link: "/user/dashboard", icon: LayoutDashboard },
        { name: "Wishlist", link: "/user/wishlist/product", icon: Package },
        { name: "Orders", link: "/user/orders/product", icon: ShoppingBag },
        { name: "Save Adress", link: "/user/saveAdress", icon: ShoppingBag },
        { name: "Your Cart", link: "/user/cart/product", icon: ShoppingBag },
    ];

    return (
        <div>
            <SidebarUi sidebar={sidebar} />
        </div>
    )
};

export default UserSidebar;