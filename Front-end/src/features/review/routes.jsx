import { lazy } from "react";
import ProtectedRoutes from "../../core/access/ProtectedRoutes";
import MainLayout from "../../layout/MainLayout";

const AddReview = lazy(() => import("./page/AddReview"));
const MyReview=lazy(()=>import("./page/MyReview"));

const reviewRoute = {
    element: (
        <ProtectedRoutes>
            <MainLayout />
        </ProtectedRoutes>
    ),
    children: [
        {
            path: "/review/my",
            element: <MyReview />
        },
        {
            path: "/review/add/:productId",
            element: <AddReview />
        }
    ]
}

export default reviewRoute;