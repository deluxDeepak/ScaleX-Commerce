const { createRazorpayOrderService } = require("./payment.service")

const createRazorpayOrder = async (req, res) => {
    // Order created whan se lega totoal amount 
    const { orderId } = req.body
    try {
        const result = await createRazorpayOrderService(orderId);

        res.status(201).json({
            success: true,
            message: "Successfully created the order ",
            data: result
        })
    } catch (error) {
        res.status(error.statusCode || 201).json({
            success: false,
            message: error.message || "Successfully created the order ",
        })

    }
}

const verifyRazorpayPayment = () => {

}
const paymentFailed = () => {

}
const getOrderStatus = () => {

}


module.exports = {
    createRazorpayOrder,
    verifyRazorpayPayment,
    getOrderStatus,
    paymentFailed
}