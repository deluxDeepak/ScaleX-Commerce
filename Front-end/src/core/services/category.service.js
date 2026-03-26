// Global service yehan rakh sakte hai 

import { api } from "../api/client"

export const getCategories = async () => {
    const res = await api.get("/category");
    return res.data?.category;
}
export const getSubCategories = async () => {
    const res = await api.get("/category/sub");
    return res.data;
}
export const getSubCategoriesByCatId = async (catId) => {
    const res = await api.get(`/category/${catId}/sub`);
    return res.data;
}