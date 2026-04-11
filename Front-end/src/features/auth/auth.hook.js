// 2.Logic hook (ye context nahi hota ) - Service call karta hai 
/*
    - hook me state rehta hai but (global state manage nahi karte hai )
    * Authcontext me only global state manage karte hai 
    - login
    - register
    - logout
    - loading
    - error
    - **service call***
*/

import { useState } from "react";
import { loginService, registerUserService } from "./authService";
import { useAuth } from "../../context/useAuth";

export const useAuthAction = () => {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [registerError, setRegisterError] = useState("");
    /*
        Hook loading kis liye hota hai

        - Hook loading hota hai jab:
        - login click
        - register click
        - logout click
        - api call
    */

    const login = async (form) => {
        try {
            setLoading(true);
            setLoginError("");

            // 1.login service 
            const user = await loginService(form);
            localStorage.setItem("token", user.accessToken);
            // 2.Immediately set user in context so ProtectedRoutes doesn't redirect
            setUser(user.user);

            return user;

        } catch (error) {
            setLoginError(error.message);
            return null;

        } finally {
            setLoading(false);
        }
    }

    const register = async (form) => {
        try {
            setLoading(true);
            setRegisterError("");
            const response = await registerUserService(form);
            localStorage.setItem("token", response.accessToken);
            console.log("AccessToken", response.accessToken);
            // Set user in context immediately after register
            setUser(response.user);

            return response;
        } catch (error) {
            setRegisterError(error.message);

            return null;

        } finally {
            setLoading(false);
        }
    }

    return {
        login,
        register,
        loading,
        loginError,
        registerError
    }

}
