const router = require("express").Router();

const { apiLimiter, adminLimiter } = require("../../core/security/ratelimit");
const authenticate = require("../../middlewares/auth.middleware");
const checkRole = require("../../middlewares/role.middleware");
const { createOrder, getMyOrders, getSellerOrders, getSingleOrder, cancelOrder, updateOrderStatus, getOrdersStatus } = require("./order.controller");

// ================= USER =================

// place order ->Done
// Service to Service call to reduce the stock 
// product service call to reduce the stock 
router.post("/",apiLimiter, authenticate, createOrder);


// get my orders (user) ->Done 
router.get("/my",apiLimiter, authenticate, checkRole("customer"), getMyOrders);

// ================= SELLER =================

// seller orders  -->Done
router.get(
  "/seller",
  adminLimiter,
  authenticate,
  checkRole("seller"),
  getSellerOrders
);

// ================= COMMON =================

// get single order (user + seller) -->Done
router.get("/:orderId",apiLimiter, authenticate, getSingleOrder);

// ================= ACTIONS =================

/*seller actions
- shipment status order status 
  - "pending",
  - "accepted",
  - "packed",
  - "shipped",
  - "out_for_delivery",
  - "delivered"
*/

router.patch(
  "/:orderId/status",
  adminLimiter,
  authenticate,
  checkRole("seller"),
  updateOrderStatus
);

// router.patch(
//   "/:orderId/track",
//   authenticate,
//   checkRole("seller"),
//   updateOrderTracking
// );

router.patch(
  "/:orderId/cancel",
  adminLimiter,
  authenticate,
  cancelOrder // both user + seller (logic inside controller)
);



// ============= FILTER ============
// query based filtering (BEST PRACTICE)
// - handle different orders like accepted ,processing ,cancelled
router.get(
  "/",
  apiLimiter,
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