const razorpayInstance = require("../../core/config/razorpay.config");
const { ValidationError, NotfoundError, PaymentError } = require("../../shared/errors")
const orderRepo = require('../orders/order.repository')
const paymentRepo = require("./payment.repository")


const createRazorpayOrderService = async (orderId) => {

    if (!orderId) {
        throw new ValidationError("Order id is required")
    }
    // 1.Find the Order from db 
    const order = await orderRepo.findOrderById(orderId);

    if (!order) {
        throw new NotfoundError("Order not found");
    }

    // 2.Check if the order is already paid or not 
    if (order.paymentStatus === "paid") {
        throw new ValidationError("Order already paid")
    }


    // 3.Fetch the total amount 
    const amount = order.totalPrice;

    // Razorpay expects amount in paise
    const options = {
        amount: amount,
        currency: "INR",
        receipt: `receipt_${order._id}`
    };

    // Only external Api warap 
    /*
        Success response 
        {
            "id": "order_IluGWxBm9U8zJ8",
            "entity": "order",
            "amount": 50000,
            "amount_paid": 0,
            "amount_due": 50000,
            "currency": "<currency>",
            "receipt": "rcptid_11",
            "offer_id": null,
            "status": "created",
            "attempts": 0,
            "notes": [],
            "created_at": 1642662092
        }

        Failure response 
        {
            "error": {
                "code": "BAD_REQUEST_ERROR",
                "description": "Order amount less than minimum amount allowed",
                "source": "business",
                "step": "payment_initiation",
                "reason": "input_validation_failed",
                "metadata": {},
                "field": "amount"
            }
        }
    */

    let razorpayOrder
    try {
        // Razor pay order create 
        razorpayOrder = await razorpayInstance.orders.create(options);
    } catch (error) {

        // If Razorpay returns a structured error, include its details
        const razorpayError = error && error.error ? error.error : null;

        // Details object in error handler 
        const details = {
            originalError: error && error.message ? error.message : error,
            razorpay: razorpayError,
            orderId: orderId
        };

        let message = "Failed to create payment order";
        if (razorpayError && razorpayError.description) {
            message = `Payment gateway error: ${razorpayError.description}`;
        } else if (error && error.message) {
            message = error.message;
        }

        //  log failure Save in DB
        try {
            await paymentRepo.createPaymentLog({
                orderId: order._id,
                paymentId: null, // no payment created yet
                event: "razorpay_order_failed",
                payload: details
            });
        } catch (logError) {
            console.error("Failed to save payment log:", logError);
        }

        // Throw main error to response 
        throw new PaymentError(message, 502, details);
    }


    // crate payment log after success and failure 

    // If Db operation fails 
    try {
        const paymentCreate = {
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: amount,
            status: "created"
        };


        // After creating payment save its id in logs 
        const result = await paymentRepo.createPayment(paymentCreate);
        const paymentLog = {
            orderId: order._id,
            paymentId: result._id,
            event: "razorpay_order_created",
            payload: razorpayOrder

        }
        await paymentRepo.createPaymentLog(paymentLog)

    } catch (dbError) {
        console.error("DB Error:", dbError);

        // IMPORTANT: Razorpay order created but DB failed
        // 👉 log this properly (critical case)
        throw new PaymentError(
            "Payment created but failed to save locally",
            500,
            { dbError }
        );
    }

    return razorpayOrder;

}

module.exports = {
    createRazorpayOrderService,
}