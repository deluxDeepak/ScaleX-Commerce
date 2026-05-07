import {
    createCheckoutOrderApi,
    createRazorpayOrderApi,
    verifyRazorpayPaymentApi,
} from "../api/payment.api";

const unwrapResponse = (response) => response?.data?.data ?? response?.data;

export const createCheckoutOrderService = async (payload) => {
    const response = await createCheckoutOrderApi(payload);
    return unwrapResponse(response);
};

export const createRazorpayOrderService = async (orderId) => {
    const response = await createRazorpayOrderApi(orderId);
    return unwrapResponse(response);
};

export const verifyRazorpayPaymentService = async (payload) => {
    const response = await verifyRazorpayPaymentApi(payload);
    return unwrapResponse(response);
};

export const loadRazorpayCheckoutScript = async () => {
    if (typeof window === "undefined") {
        return false;
    }

    if (window.Razorpay) {
        return true;
    }

    return await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};
