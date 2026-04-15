import { lazy } from "react";
import UserLayout from "../../layout/UserLayout";
import MainLayout from "../../layout/MainLayout";
import ProtectedRoutes from "../../core/access/ProtectedRoutes";


const Wishlist = lazy(() => import("./pages/Wishlist"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const Order = lazy(() => import("./pages/Order"));
const SaveAddress = lazy(() => import("./pages/SaveAddress"));
const CartShopping = lazy(() => import("./pages/CartShopping"));
const Checkout = lazy(() => import("./pages/Checkout"));

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