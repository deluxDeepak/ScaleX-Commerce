const router = require("express").Router();

// ========================Cycle chalta hai ============================

// auth middleware from there we get user 
// User routes check =======================================
router.get("/", auth, getMyOrders);      // current user orders
router.post("/", auth, createOrder);    // create order
router.get("/:id", auth, getOrderById); // single order
router.patch("/:id/cancel", auth, cancelOrder);

// Seller Orders ===========================================
router.get("/seller", auth, getSellerOrders);
router.patch("/:id/ship", auth, shipOrder);
router.patch("/:id/deliver", auth, deliverOrder);

// admin Orders ============================================
router.get("/all", auth, adminGetAllOrders);
router.patch("/:id/status", auth, updateOrderStatus);
router.delete("/:id", auth, deleteOrder);

// Payment realted routes =================================
router.patch("/:id/pay", auth, markAsPaid);
router.patch("/:id/fail", auth, markPaymentFailed);


module.exports = router