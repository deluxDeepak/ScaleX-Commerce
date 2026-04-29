import { acceptOrderApi, cancelOrderApi, createProductApi, getMyProductAPi, getSellerOrderApi, registerSellerApi } from "./seller.api";

// future validation route 
export const registerSellerService = async (data) => {
    const res = await registerSellerApi(data);
    return res.user
}


// Create product seller (form data bhej do  baki axios handle kar lega )
export const createProductService = async (data) => {
    try {
        const res = await createProductApi(data);
        return res.data
    } catch (error) {
        throw new Error("Error in creating product", error);

    }

}

//Get product of the seller 
export const getMyProductService = async () => {
    try {
        const res = await getMyProductAPi();
        return res.data;
    } catch (error) {
        throw new Error("Error in product fetching", error);

    }

}

// Get all orders of seller
export const getSellerOrderService = async (status = null) => {
    try {
        const res = await getSellerOrderApi(status);
        return res.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || "Error in Order Service"
        );
    }
};

export const acceptOrderService = async (productId, status = "accepted") => {
    try {
        const res = await acceptOrderApi(productId, status);
        return res.data;
    } catch (error) {
        throw new Error("Error in Accept Order Service", error);

    }
}

export const cancelOrderService = async (productId) => {
    try {
        const res = await cancelOrderApi(productId);
        return res.data;
    } catch (error) {
        throw new Error("Error in Cancel Order Service", error);

    }
}

