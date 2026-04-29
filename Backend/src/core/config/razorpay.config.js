const Razorpay = require("razorpay");
const config = require("./env.config");

const razorpayInstance = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET
});

module.exports = razorpayInstance;