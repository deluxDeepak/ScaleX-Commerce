import React from "react";
import { createBrowserRouter } from "react-router-dom";


import RazorpayButton from "../features/payment/components/RazorpayButton";
import storeRoutes from "../features/store/routes";
import productRoutes from "../features/product/routes";
import sellerRoutes from "../features/seller/routes";
import userRoutes from "../features/user/routes";
import authRoutes from "../features/auth/route";
import reviewRoutes from "../features/review/routes";

const testFunction = () => (
    <div>
        This is testing button
        <RazorpayButton />
    </div>
);

export const router = createBrowserRouter([
    storeRoutes,
    productRoutes,
    reviewRoutes,
    sellerRoutes,
    userRoutes,
    authRoutes,
    { path: "/test", Component: testFunction },
]);