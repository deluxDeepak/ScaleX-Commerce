import { getMeApi, loginApi, logoutAPi, refreshApi, registerUserApi } from "./auth.api";
// Backend hit from here (yehan clean request onyl ) handle error in context 

/** 
 * -------------Done in inceptor--------------------------
    export const loginRequest = async (form) => {

        console.log("loginRequest called");

        try {

            const res = await api.post("/auth/login", form);
            console.log("Full axios response", res);
            console.log("Data", res.data);
            return res.data;

        } catch (err) {

            console.log("Error from axios", err);
            console.log("Error response", err?.response);

            // Ye backend error form karega 
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                "Something went wrong";

            // custom error throw karo
            throw new Error(message);
        }
    };

*/

// ====Api call handle karne ka logic rehna chiye (Error and response) ============
// Only logic here 
export const loginService = async (data) => {
    try {
        const res = await loginApi(data);
        return res.data;

    } catch (error) {
        throw new Error("Error fromaxios is", error);

    }
}
export const registerUserService = async (data) => {
    const res = await registerUserApi(data);
    return res.data;
}

export const getMeService = async () => {
    const res = await getMeApi();
    return res.data;
}
export const refreshService = async () => {
    const res = await refreshApi();
    return res.data;
};

export const logoutService = async () => {
    const res = await logoutAPi();
    return res.data;
};