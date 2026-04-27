const { default: mongoose } = require("mongoose");
const logger = require("../../core/logger/logger");
const { ValidationError, NotfoundError, AuthError } = require("../../shared/errors");
const { reduceStockService } = require("../products/product.service");
const orderRepo = require("./order.repository");


const isTransactionUnsupportedError = (error) => {
    return (
        error?.code === 20
        || error?.codeName === "IllegalOperation"
        || error?.errorResponse?.code === 20
        || error?.errorResponse?.codeName === "IllegalOperation"
    );
};

const buildOrder = async (items, userId, address, paymentMethod, session = null) => {
    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
        const updatedProduct = await reduceStockService(item.productId, item.qty, "decrease", session);

        logger.info({ updatedProduct }, "Product stock reduced ");

        const orderItem = {
            product: updatedProduct._id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            seller: updatedProduct.seller,
            qty: item.qty,
            image: updatedProduct.image,
        };

        totalPrice += updatedProduct.price * item.qty;
        orderItems.push(orderItem);
    }

    const orderSummary = {
        user: userId,
        items: orderItems,
        totalPrice,
        address,
        paymentMethod,
    };

    return orderRepo.createOrder(orderSummary, session);
};


// ====Using session ===========
const createOrderService = async (items, userId, address, paymentMethod) => {
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const order = await buildOrder(items, userId, address, paymentMethod, session);
        await session.commitTransaction();
        return order;
    } catch (error) {
        if (session && session.inTransaction()) {
            await session.abortTransaction();
        }

        // Standalone Mongo does not support transactions; retry without session.
        if (isTransactionUnsupportedError(error)) {
            logger.warn({ error }, "Transactions unsupported, retrying order creation without transaction");
            return buildOrder(items, userId, address, paymentMethod);
        }

        throw error;
    } finally {
        if (session) {
            session.endSession();
        }

    }
}

const getMyOrdersService = async (userId) => {
    if (!userId) {
        throw new ValidationError("User is required ");
    }

    const orders = await orderRepo.findMyOrders(userId);
    return orders || []
}

const getSellerOrdersService = async (sellerId, status) => {
    if (!sellerId) {
        throw new ValidationError("Seller id is required");
    }
    // 1.Find the Order by seller id store in document
    const orders = await orderRepo.findOrderBySellerID(sellerId, status);
    console.log("Orders get by the seller", orders);
    /*
        Seller 1 and seller 2 included 
        items: [
            { productId: A, seller: seller1 },
            { productId: B, seller: seller2 }
        ]
    */

    if (!orders || orders.length === 0) {
        return [];
    }
    return orders || [];
}

const getSingleOrderService = async (orderId, userId) => {
    if (!orderId) {
        throw new ValidationError("Order id is not provided");
    }

    if (!userId) {
        throw new ValidationError("User id is not given");
    }
    const order = await orderRepo.findOneOrder(orderId, userId);

    if (!order) {
        throw new NotfoundError("Order not found or unauthorized");
    }

    return order;
};

// Future multiple seller 
const acceptOrderService = async (sellerId, orderId) => {
    if (!sellerId) {
        throw new ValidationError("SellerId is not present");
    }

    if (!orderId) {
        throw new ValidationError("OrderId is not given");
    }

    // 1. Fetch order
    const order = await orderRepo.findOrderById(orderId);

    if (!order) {
        throw new NotfoundError("Order not found");
    }

    // 2. Check seller ownership (VERY IMPORTANT)
    // if (order.sellerId.toString() !== sellerId.toString()) {
    //     throw new AuthorizationError("You are not allowed to access this order");
    // }

    // 3. Check status
    if (order.status !== "pending") {
        throw new ValidationError("Order already processed");
    }

    // 4. Update status
    const updatedOrder = await orderRepo.updateOrderById(orderId, {
        status: "accepted",
    });
    console.log("Updated order ", updatedOrder);

    return updatedOrder;
};

// Cancesaltion rules 
/*
    1.Verify the user
    2.Find the Order of the user / seller 
    3.check the status of order 
    4.Already delivered 
    5.Already cancel product
    6. After shipping user can not cancel the Product 
*/
const cancelOrderService = async (userId, role, orderId) => {

    if (!userId || !orderId) {
        throw new ValidationError("Order or UserId is not persent");

    }

    console.log("Order id is ", orderId);

    const order = await orderRepo.findOrderById(orderId);
    if (!order) {
        throw new NotfoundError("Order is not Found")
    }

    if (order.status === "delivered") {
        throw new ValidationError("Dlivered order can not be cancelled");
    }
    if (order.status === "cancelled") {
        throw new ValidationError("Order is already cancelled");
    }

    // after shipped user can not cancel the order 
    if ((role === "user" || role === "customer") && order.status === "shipped") {
        throw new ValidationError("Cannot cancel after shipping")
    }

    // Finally update the status 
    const updatedOrder = await orderRepo.updateOrderById(orderId, {
        status: "cancelled"
    });

    return updatedOrder;

}

const getOrdersStatusService = async (userId, role, status) => {
    if (!userId) {
        throw new ValidationError("userId is required");
    }
    if (!role) {
        throw new ValidationError("Role is reuired");
    }

    // Build query dynamically
    const query = {};

    if (status) {
        query.status = status;
    }

    if (role === "user" || role == "customer") {
        query.user = userId;
    } else if (role === "seller") {
        query.seller = userId;
    } else {
        throw new AuthError("Invalid role");
    }

    // 1.user
    // 2.status
    const orders = await orderRepo.findOrders(query);

    if (orders.length === 0 || !orders) {
        throw new NotfoundError(`You dont have ${status} orders`)
    }

    return orders;
}

module.exports = {
    createOrderService,
    getMyOrdersService,
    getSellerOrdersService,
    getSingleOrderService,
    acceptOrderService,
    cancelOrderService,
    getOrdersStatusService
}