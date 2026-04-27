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


export const getSellerOrderService = async () => {
    try {
        const res = await getSellerOrderApi();
        return res.data;
    } catch (error) {
        throw new Error("Error in Order Service", error);

    }

}

export const acceptOrderService = async (productId) => {
    try {
        const res = await acceptOrderApi(productId);
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

