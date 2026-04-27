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

export const getSellerOrderApi = async () => {
    return await api.get("/order/seller")
}

export const acceptOrderApi = async (productId) => {
    return await api.patch(`/order/${productId}/accept`)
}

export const cancelOrderApi = async (productId) => {
    return await api.patch(`/order/${productId}/cancel`)
}