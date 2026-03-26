import Login from "./pages/Login";

const authRoutes = {
    path: "/auth",
    children: [
        { path: "login", element: <Login /> }
    ]
}

export default authRoutes