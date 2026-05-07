const Payment = require("./payment.model");
const PaymentLog = require("./paymentLogs.model");


const createPayment = (data) => {
    return Payment.create(data);
}

const findOneUpdate = (razorpayOrderId, data) => {
    return Payment.findOneAndUpdate({ razorpayOrderId: { $eq: razorpayOrderId } }, data, { new: true });
}

const createPaymentLog = (data) => {
    return PaymentLog.create(data)
}

module.exports = {
    createPayment,
    createPaymentLog,
    findOneUpdate,
}