import React, { createContext, useEffect, useState } from "react";
import { getMeService, logoutService, refreshService } from "../features/auth/authService";

export const AuthContext = createContext();

// Only context provide karega (Hook ka kam nahi karega ---Service call nahi karega)
// ********|| Context direct api call nahi karega ||*************
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    /*
        // ========dont manage here(only manage context) ==========
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
        console.log("set user is ", user)
    */
    const [loading, setLoading] = useState(true);
    /*
    Context loading kis liye hota hai
        - Context me loading hota hai jab:
        - app start
        - refresh
        - /me call
        - token check
        - user load

        Use case -
        - Navbar
        - RouteGuard
        - Layout
        - App

    */

    // 2.Load user on refresh 
    // Load the user on route agr refresh ho gya ya state change ho gya
    // - site refesh karne par state remove ho jata hai  ( Token remove )
    useEffect(() => {

        // User getme rquest karega autmatically (State change )
        const loadUser = async () => {
            try {
                let token = localStorage.getItem("token");
                console.log("Token found", token);

                // If access token is missing but refresh cookie exists, restore a new access token.
                if (!token) {
                    try {
                        const refreshRes = await refreshService();
                        token = refreshRes?.accessToken;
                        if (token) {
                            localStorage.setItem("token", token);
                        }
                    } catch (refreshErr) {
                        console.log("Refresh failed during startup:", refreshErr);
                        // If refresh fails, just proceed without token
                        setLoading(false);
                        return;
                    }
                }

                if (!token) {
                    setLoading(false);
                    return;
                }

                console.log("Calling /me");
                const res = await getMeService();
                console.log("Me response", res);
                setUser(res.user);
                setLoading(false);

            } catch (err) {
                console.log("Me error", err);
                localStorage.removeItem("token");
                setUser(null);
                setLoading(false);
            }
        };
        loadUser();

    }, []);

    const logout = async () => {
        await logoutService();
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            logout,
            setUser

        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

/**
    login → setUser
    register → setUser
    refresh → setUser
    logout → setUser(null)
 */