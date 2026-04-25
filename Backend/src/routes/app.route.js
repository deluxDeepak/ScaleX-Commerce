// Sabhi moduel ka route yehan leke aoo (Central route system)

const router = require("express").Router();
const health = require("../routes/health.route");
const cartRoutes = require("../modules/cart/cart.route");
const categoryRoutes = require("../modules/category/category.routes");
const productRoutes = require("../modules/products/product.routes");
const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/user/user.routes");
const reviewRoutes = require("../modules/reviewRating/review.routes");
const monitoringRoutes = require("./monitoring.route");
const orderRoutes=require("../modules/orders/order.routes");

// All module route export here 

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
// Product route ======
router.use("/product", productRoutes);
router.use("/review", reviewRoutes);
router.use("/cart", cartRoutes);

router.use("/order",orderRoutes);


// Health route bhi yehi export kar do 
router.use("/health", health);
router.use("/test", require("./test.routes"));

// Monitoring routes 
router.use("/", monitoringRoutes);

module.exports = router;