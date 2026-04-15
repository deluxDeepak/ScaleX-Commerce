import { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));

const authRoutes = {
    path: "/auth",
    children: [
        { path: "login", element: <Login /> }
    ]
}

export default authRoutes