import { lazy } from "react";
import SellerLayout from "../../layout/SellerLayout";
import RoleRoutes from "../../core/access/RoleRoutes";
import AddProduct from "./pages/AddProduct";

const SellerDashboard = lazy(() => import("./pages/SellerDashboard"));
const SellerProducts = lazy(() => import("./pages/SellerProducts"));
const SellerOrder = lazy(() => import("./pages/SellerOrder"));

// Agr seller user me hoga tabhi ye route access kar sakta hai 
const sellerRoutes = {
    path: "/seller",
    // layout gaurd laga sakte hai 
    element: (
        <RoleRoutes roles={["seller"]}>
            <SellerLayout />
        </RoleRoutes>
    ),
    children: [
        { index: true, path: "dashboard", element: <SellerDashboard /> },
        { path: "product", element: <SellerProducts /> },
        { path: "order", element: <SellerOrder /> },
        { path: "addProduct", element: <AddProduct /> },
        { path: "addProduct-test", element: <AddProduct /> },
    ],
};

export default sellerRoutes;