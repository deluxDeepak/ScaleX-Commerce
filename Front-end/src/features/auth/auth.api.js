import { api } from "../../core/api/client";

// Only api call (pure repsonse axios bhej do )
// Handle response in logic osi ko decide karne do kya reponse lena hai nahi lena hai 
export const loginApi = async (data) => {
    return await api.post("/auth/login", data);
}

export const registerUserApi = async (data) => {
    return await api.post("/auth/register", data);
}
export const getMeApi = async () => {
    return await api.get("/auth/me");
}
export const refreshApi = async () => {
    return await api.post("/auth/refresh");

};

export const logoutAPi = async () => {
    return await api.post("/auth/logout");

};