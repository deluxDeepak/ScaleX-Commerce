const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    // Razorpay returns payment details
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    // Amount and currency 
    amount: Number,
    currency: { type: String, default: "INR" },

    // Update the status 
    status: {
        type: String,
        enum: ["created", "authorized", "captured", "failed"],
        default: "created"
    },

    method: String, // upi, card, netbanking

}, { timestamps: true })

const Payment=mongoose.model("Payment",paymentSchema);
module.exports=Payment