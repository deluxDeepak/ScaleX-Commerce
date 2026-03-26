import { lazy } from "react";
import MainLayout from "../../layout/MainLayout";

const Home = lazy(() => import("./pages/Home"));

const storeRoutes = {
    element: <MainLayout />,
    children: [
        { path: "/", element: <Home /> },
        
    ],
};

export default storeRoutes;