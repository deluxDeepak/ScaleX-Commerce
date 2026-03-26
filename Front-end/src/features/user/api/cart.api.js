import { api } from "../../../core/api/client";

// Cart items of user ---------------------------------------
export const getCartItemsApi = async () => {
    return await api.get("/cart");
}
// data->quantity ,initial price ,
export const addCartItemsApi = async (productId, data) => {
    return await api.post(`/cart/${productId}/add`, data);
}
// Count update kar sakte hai 
export const updateCartItemsApi = async (id, data) => {
    return await api.patch(`/cart/${id}`, data);
}
export const removeCartItemsApi = async (id) => {
    return await api.delete(`/cart/${id}`);
}

// Light api Cart 
export const clearCartItemsApi = async () => {
    return await api.delete(`/cart/clear`);
}
export const countCartItemsApi = async () => {
    return await api.get(`/cart/count`);
}
export const totalCartItemsApi = async () => {
    return await api.get(`/cart/total`);
}

// check if cart items is persent or not 
export const checkCartItemsApi = async (productId) => {
    return await api.get(`/cart/check/${productId}`);
}