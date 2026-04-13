import { api } from "../../../core/api/client";

// main User profile  || wishlist bhi user me hi add hoga || Membership details 
export const getProfileApi = async () => {
    return await api.get("user/profile/me");    //all details except password accesstoken 
}
export const updateProfileApi = async (data) => {
    return await api.patch("user/profile/me", data);
}

// Profile image  
export const updateProfileImageApi = async (file) => {
    return await api.post(`user/profile/image`, file);
}
export const deleteProfileImageApi = async () => {
    return await api.delete(`user/profile/image`);
}