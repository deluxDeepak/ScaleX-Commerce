import { api } from "../../../core/api/client";

// main User profile 
export const getProfileApi = async () => {
    return await api.get("/profile/me");    //all details except password accesstoken 
}
export const updateProfileApi = async (data) => {
    return await api.patch("/profile/me", data);
}

// Profile image  
export const updateProfileImageApi = async (file) => {
    return await api.post(`/profile/image`, file);
}
export const deleteProfileImageApi = async () => {
    return await api.delete(`/profile/image`);
}