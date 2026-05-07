const { createRazorpayOrderService, verifyRazorpayPaymentService } = require("./payment.service")

const createRazorpayOrder = async (req, res) => {
    // Order created whan se lega totoal amount 
    const { orderId } = req.body
    try {
        const result = await createRazorpayOrderService(orderId);

        res.status(201).json({
            success: true,
            message: "[createRazorpayOrder] Successfully created the order ",
            data: result
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "[createRazorpayOrder] Failed in order creation ",
        })

    }
}

// Razorpay response --
// - payment id 
// - webhook use 
const verifyRazorpayPayment = async (req, res) => {

    const response = req.body;
    // const response={
    //     razorpay_payment_id,
    //     razorpay_order_id,
    //     razorpay_signature
    // }
    try {
        const result = await verifyRazorpayPaymentService(response);

        res.status(200).json({
            success: true,
            message: "[verifyRazorpayPayment] Successfully verified the Payment ",
            data: result
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "[verifyRazorpayPayment] Failed in verify payment",
        })
    }
}
const paymentFailed = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Payment failure event received",
    });

}
const getOrderStatus = async (req, res) => {
    res.status(501).json({
        success: false,
        message: "Order status tracking is not implemented yet",
    });

}


module.exports = {
    createRazorpayOrder,
    verifyRazorpayPayment,
    getOrderStatus,
    paymentFailed
}