import React from "react";
import { createBrowserRouter } from "react-router-dom";


import storeRoutes from "../features/store/routes";
import productRoutes from "../features/product/routes";
import sellerRoutes from "../features/seller/routes";
import userRoutes from "../features/user/routes";
import authRoutes from "../features/auth/route";
import reviewRoutes from "../features/review/routes";
import introductionRoutes from "../features/introScalex/route"

const testFunction = () => (
    <div>
        Payment checkout lives on the user checkout page now.
    </div>
);

export const router = createBrowserRouter([
    storeRoutes,
    productRoutes,
    reviewRoutes,
    sellerRoutes,
    userRoutes,
    authRoutes,
    introductionRoutes,
    { path: "/test", Component: testFunction },
]);