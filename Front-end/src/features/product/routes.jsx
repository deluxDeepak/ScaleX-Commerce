import { lazy } from "react";
import MainLayout from "../../layout/MainLayout";
import Recommendation from "./page/Recommendation";

const Category = lazy(() => import("./page/Category"));
const Product = lazy(() => import("./page/Product"));
const SearchResult = lazy(() => import("./page/SearchResult"));

const productRoutes = {
    element: <MainLayout />,
    children: [
        { path: "/products", element: <Category /> },
        { path: "/products/:productId", element: <Product /> },
        { path: "/products/search", element: <SearchResult /> },
        { path: "/products/searchRecommend", element: <Recommendation /> },
    ],
};

export default productRoutes;