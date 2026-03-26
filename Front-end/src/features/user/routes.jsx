import { lazy } from "react";
import UserLayout from "../../layout/UserLayout";
import MainLayout from "../../layout/MainLayout";


const Wishlist = lazy(() => import("./pages/Wishlist"));
import UserDashboard from "./pages/UserDashboard";
import Order from "./pages/Order";
import SaveAddress from "./pages/SaveAddress";
import ProtectedRoutes from "../../core/access/ProtectedRoutes";
import CartShopping from "./pages/CartShopping";
import Checkout from "./pages/Checkout";

// const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const userRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "user",
      element: (
        <ProtectedRoutes>
          <UserLayout />
        </ProtectedRoutes>
      ),
      children: [
        { path: "dashboard", element: <UserDashboard /> },
        { path: "saveAdress", element: <SaveAddress /> },
        { path: "wishlist/product", element: <Wishlist /> },
        { path: "orders/product", element: <Order /> },

        { path: "cart/product", element: <CartShopping /> },
        { path: "cart/checkout", element: <Checkout /> },
      ],
    },
  ],
};

export default userRoutes;