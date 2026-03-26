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

export const useAuthAction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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
            setError("");

            // 1.login service 
            const user = await loginService(form);
            localStorage.setItem("token", user.accessToken);
            // 2.Get me save the user 

            return user;

        } catch (error) {
            setError(error.message);
            return null;

        } finally {
            setLoading(false);
        }
    }

    const register = async (form) => {
        try {
            setLoading(true);
            setError("");
            const response = await registerUserService(form);
            localStorage.setItem("token", response.accessToken);
            console.log("AccessToken", response.accessToken);

            return response;
        } catch (error) {
            setError(error.message);

            return null;

        } finally {
            setLoading(false);
        }
    }

    return {
        login,
        register,
        loading,
        error,
    }

}
