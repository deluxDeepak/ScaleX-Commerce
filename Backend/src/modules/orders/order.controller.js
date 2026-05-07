const logger = require("../../core/logger/logger");
const { createOrderService, getMyOrdersService, getSellerOrdersService, getSingleOrderService, updateOrderService, cancelOrderService, getOrdersStatusService } = require("./order.service");

const createOrder = async (req, res) => {
    const userId = req.user.id;

    // Find address from user persent 
    const { items, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: "No items in order " })
    }

    try {
        const order = await createOrderService(items, userId, address, paymentMethod);

        res.status(201).json({
            message: "Order created Successfully !",
            success: true,
            order: order
        })
    } catch (error) {
        logger.error({ error }, "Error in order creation")
        res.status(error.statusCode || 400).json({
            success: false,
            message: error.message || "Error in order creation"
        })

    }
}


const getMyOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const userOrders = await getMyOrdersService(userId);
        if (userOrders.length === 0) {
            return res.status(200).json({
                message: "Order card is empty | No order till date",
                success: true
            })
        }
        return res.status(200).json({
            message: "Order fetch Successfully",
            success: true,
            orders: userOrders
        })

    } catch (error) {
        logger.error({ error }, "Error in fetching the Orders");
        res.status(error.statusCode || 400).json({
            message: error.message || "Error in fetching orders",
            success: false
        })
    }

}

// Only seller can be changed 
const getSellerOrders = async (req, res) => {

    const sellerId = req.user.id;
    const { status, page, limit } = req.query;

    try {
        const result = await getSellerOrdersService(sellerId, status, page, limit);
        if (result.orders.length === 0) {
            return res.status(200).json({
                message: "Order card is empty | No order till date",
                success: true
            })
        }
        return res.status(200).json({
            message: "Order fetch Successfully",
            success: true,
            data: result
        })

    } catch (error) {
        logger.error({ error }, "Error in fetching the Orders");
        res.status(error.statusCode || 400).json({
            message: error.message || "Error in fetching orders",
            success: false
        })
    }

}

// SingleOrder details ========
const getSingleOrder = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params.orderId;

    try {
        const SingleOrder = await getSingleOrderService(orderId, userId);
        res.status(201).json({
            message: "Order fetch Successfully",
            success: true,
            order: SingleOrder
        })

    } catch (error) {
        logger.error({ error }, "Error in fetching the Orders");
        res.status(error.statusCode || 400).json({
            message: error.message || "Error in fetching orders",
            success: false
        })

    }

}

// Change the status of tracking 
const updateOrderStatus = async (req, res) => {
    const sellerId = req.user.id;
    const orderId = req.params.orderId;
    const { status } = req.body;

    try {
        const result = await updateOrderService(sellerId, orderId, status)
        console.log("Result is ", result);
        res.status(201).json({
            message: "Order accepted and shipped",
            success: true,
            result: result
        })
    } catch (error) {
        logger.error({ error }, "Error in accepting order");
        res.status(error.statusCode || 400).json({
            message: error.message || "Error in accepting order",
            success: false
        })

    }

}

/*
    Both can cancel the order 
    user->before shipping
    seller->before shipping
*/
const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    try {
        const result = await cancelOrderService(userId, role, orderId)
        res.status(201).json({
            message: "Order Canceled Successfully",
            success: true,
            result: result
        })
    } catch (error) {
        logger.error({ error }, "Error in cancelling the  order");
        res.status(error.statusCode || 400).json({
            message: error.message || "Error in cancelling the order",
            success: false
        })
    }
}
const updateOrderTracking = async () => {

}
const getOrdersStatus = async (req, res) => {
    const { status } = req.query;
    const userId = req.user.id;
    const role = req.user.role;
    console.log("status ", status);

    try {
        const orders = await getOrdersStatusService(userId, role, status);
        res.status(201).json({
            message: "Order status fetch Successfully",
            success: true,
            orders: orders
        })
    } catch (error) {
        logger.error({ error }, "Error in fetching the Order status");
        res.status(error.statusCode || 400).json({
            message: error.message || "Error in fetching the Order status",
            success: false
        })

    }

}

module.exports = {
    createOrder,
    getOrdersStatus,
    updateOrderTracking,
    cancelOrder,
    updateOrderStatus,
    getSingleOrder,
    getSellerOrders,
    getMyOrders

}