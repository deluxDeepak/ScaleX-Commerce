const router = require("express").Router();

const authenticate = require("../../middlewares/auth.middleware");
const checkRole = require("../../middlewares/role.middleware");
const { createOrder, getMyOrders, getSellerOrders, getSingleOrder, acceptOrder, cancelOrder, updateOrderTracking, getOrdersStatus } = require("./order.controller");

// ================= USER =================

// place order ->Done
router.post("/", authenticate, createOrder);


// get my orders (user) ->Done 
router.get("/my", authenticate, checkRole("customer"), getMyOrders);

// ================= SELLER =================

// seller orders  -->Done
router.get(
  "/seller",
  authenticate,
  checkRole("seller"),
  getSellerOrders
);

// ================= COMMON =================

// get single order (user + seller) -->Done
router.get("/:orderId", authenticate, getSingleOrder);

// ================= ACTIONS =================

// seller actions
router.patch(
  "/:orderId/accept",
  authenticate,
  checkRole("seller"),
  acceptOrder
);

router.patch(
  "/:orderId/cancel",
  authenticate,
  cancelOrder // both user + seller (logic inside controller)
);

router.patch(
  "/:orderId/track",
  authenticate,
  checkRole("seller"),
  updateOrderTracking
);

// ============= FILTER ============
// query based filtering (BEST PRACTICE)
// - handle different orders like accepted ,processing ,cancelled
router.get(
  "/",
  authenticate,
  getOrdersStatus // handles ?status=, ?role= etc
);






// // admin Orders ============================================
// router.get("/all", auth, adminGetAllOrders);
// router.patch("/:id/status", auth, updateOrderStatus);
// router.delete("/:id", auth, deleteOrder);

// // Payment realted routes =================================
// router.patch("/:id/pay", auth, markAsPaid);
// router.patch("/:id/fail", auth, markPaymentFailed);


module.exports = router