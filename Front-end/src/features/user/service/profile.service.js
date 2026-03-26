import { 
    getProfileApi,
    updateProfileApi,
    updateProfileImageApi,
    deleteProfileImageApi

 } from "../api/profile.api";


// Main profile Service 
export const getProfileService = async () => {
    const res = await getProfileApi()    //all details except password accesstoken
    return res.data;
}
export const updateProfileService = async (data) => {
    const res = await updateProfileApi(data);
    return res.data;
}

// Image service 
export const updateProfileImageService = async (file) => {
    const res = await updateProfileImageApi(file);
    return res.data;
}
export const deleteProfileImageService = async () => {
    const res = await deleteProfileImageApi();
    return res.data;
}