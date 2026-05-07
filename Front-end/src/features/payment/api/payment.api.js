import { api } from "../../../core/api/client";

export const createCheckoutOrderApi = async (payload) => {
    return await api.post("/order", payload);
};

export const createRazorpayOrderApi = async (orderId) => {
    return await api.post("/payment/create-order", { orderId });
};

export const verifyRazorpayPaymentApi = async (payload) => {
    return await api.post("/payment/verify-payment", payload);
};
