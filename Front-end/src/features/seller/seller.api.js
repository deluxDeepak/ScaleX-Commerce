import { api } from "../../core/api/client"

// Seller related here (alag module )
// Temp route --fututure validation 
export const registerSellerApi = async (data) => {
    return await api.post("/auth/register", data);
}

// Create product Service 
export const createProductApi = async (data) => {
    return await api.post("/product", data);
}

//Get product of the seller 
export const getMyProductAPi = async () => {
    return await api.get("/product/my");

}

// Get all orders of seller 
export const getSellerOrderApi = (status = null) => {
    const url = status
        ? `/order/seller?status=${status}`
        : `/order/seller`;

    return api.get(url);
};

export const acceptOrderApi = async (productId, status) => {
    return await api.patch(`/order/${productId}/status`, { status })
}

export const cancelOrderApi = async (productId) => {
    return await api.patch(`/order/${productId}/cancel`)
}