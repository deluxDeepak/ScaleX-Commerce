import {
    getCartItemsApi,
    addCartItemsApi,
    updateCartItemsApi,
    removeCartItemsApi,
    clearCartItemsApi,
    countCartItemsApi,
    totalCartItemsApi,
    checkCartItemsApi

} from "../api/cart.api";

// Cart product-------------------- 
export const getCartItemsService = async () => {
    const res = await getCartItemsApi();
    return res.data;
}
export const addCartItemsService = async (productId, data) => {
    const res = await addCartItemsApi(productId, data);
    return res.data;

}

// Increase the quantity --update the cart jo hai wahi 
export const updateCartItemsService = async (id, data) => {
    const res = await updateCartItemsApi(id, data);
    return res.data;
}

// Remove from the cart ----product remove
export const removeCartItemsService = async (id) => {
    const res = await removeCartItemsApi(id);
    return res.data;
}


// Remove all items from the cart 
export const clearCartItemsService = async () => {
    const res = await clearCartItemsApi();
    return res.data;
}
export const countCartItemsService = async () => {
    const res = await countCartItemsApi();
    return res.data;
}
export const totalCartItemsService = async () => {
    const res = await totalCartItemsApi();
    return res.data;
}

// check if cart items is persent or not 
export const checkCartItemsService = async (productId) => {
    const res = await checkCartItemsApi(productId);
    return res.data;
}