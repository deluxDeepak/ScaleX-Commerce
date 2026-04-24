// Global service yehan rakh sakte hai 

import { api } from "../api/client"

export const getCategories = async () => {
    const res = await api.get("/category");
    return res.data?.category;
}

// Not important here 
export const getSubCategories = async () => {
    const res = await api.get("/category/sub");
    console.log("Subcat is from service ",res.data);
    return res.data;
}

// Important after selection of category 
export const getSubCategoriesByCatId = async (catId) => {
    const res = await api.get(`/category/${catId}/sub`);
    return res.data;
}