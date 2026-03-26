import React, { createContext, useEffect, useState } from "react";
import { getMeService, logoutService } from "../features/auth/authService";

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
            const token = localStorage.getItem("token");
            console.log("Token found", token);
            if (!token) {
                setLoading(false);
                return;
            }
            try {

                console.log("Calling /me");
                const res = await getMeService();
                console.log("Me response", res);
                setUser(res.user);
                setLoading(false);
                
            } catch (err) {
                console.log("Me error", err);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
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