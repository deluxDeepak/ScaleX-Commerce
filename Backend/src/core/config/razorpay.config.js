const Razorpay = require("razorpay");
const config = require("./env.config");

let razorpayInstance = null;

// Only initialize Razorpay in non-test environments and when credentials are available
if (config.NODE_ENV !== "test" && config.RAZORPAY_KEY_ID && config.RAZORPAY_KEY_SECRET) {
    razorpayInstance = new Razorpay({
        key_id: config.RAZORPAY_KEY_ID,
        key_secret: config.RAZORPAY_KEY_SECRET
    });
}

module.exports = razorpayInstance;