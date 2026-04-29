const mongoose = require("mongoose");

/*
Debugging lifesaver
Webhook verification
Fraud investigation
*/
const PaymentLogSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    paymentId: {
        type:mongoose.Schema.Types.Object,
        ref:"Payment",
        reuired:true
    },

    event: String, // created / failed / success / webhook

    payload: Object, // raw Razorpay response

}, { timestamps: true });

const PaymentLog = mongoose.model("PaymentLog", PaymentLogSchema)
module.exports =PaymentLog