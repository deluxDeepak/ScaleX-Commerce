import ProtectedRoutes from "../../core/access/ProtectedRoutes";
import MainLayout from "../../layout/MainLayout";
import AddReview from "./page/AddReview";
import MyReview from "./page/MyReview";

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