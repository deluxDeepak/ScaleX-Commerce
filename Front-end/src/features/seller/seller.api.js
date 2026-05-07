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
export const getSellerOrderApi = (status = null, page = 1, limit = 10) => {
    // Use url search params 
    const params = new URLSearchParams();
    if (status !== null && status !== undefined && String(status).trim() !== "") params.append("status", status);
    if (page !== null && page !== undefined) params.append("page", page);
    if (limit !== null && limit !== undefined) params.append("limit", limit);

    const query = params.toString();
    const url = query ? `/order/seller?${query}` : `/order/seller`;

    return api.get(url);
};

export const acceptOrderApi = async (productId, status) => {
    return await api.patch(`/order/${productId}/status`, { status })
}

export const cancelOrderApi = async (productId) => {
    return await api.patch(`/order/${productId}/cancel`)
}