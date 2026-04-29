const { createRazorpayOrder, verifyRazorpayPayment, paymentFailed, getOrderStatus } = require('./paymnet.controller');

const router = require('express').Router();

router.post("/create-order", createRazorpayOrder);   // backend creates order
router.post("/verify-payment", verifyRazorpayPayment); // signature verify
router.post("/payment-failed", paymentFailed);       // optional logging
router.get("/order-status/:id", getOrderStatus);     // track payment/order

module.exports = router