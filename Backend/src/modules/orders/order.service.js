const { default: mongoose } = require("mongoose");
const logger = require("../../core/logger/logger");
const { ValidationError, NotfoundError, AuthError, DatabaseError } = require("../../shared/errors");
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

    // 1.Create order Items (Snapshot )
    for (const item of items) {
        const updatedProduct = await reduceStockService(item.productId, item.qty, "decrease", session);

        logger.info({ updatedProduct }, "Product stock reduced ");

        const orderItem = {
            productId: updatedProduct._id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            seller: updatedProduct.seller,
            qty: item.qty,
            image: updatedProduct.image,
        };

        totalPrice += updatedProduct.price * item.qty;
        orderItems.push(orderItem);
    }

    // 2.Create order wihout shipment 
    const orderSummary = {
        user: userId,
        items: orderItems,
        status: "created",   //default also 
        totalPrice,
        address,
        paymentMethod,
    };
    const order = await orderRepo.createOrder(orderSummary, session);
    if (!order) {
        throw new DatabaseError("Order not created ")
    }
    // Create karne ke baad milega orderitems id 

    // 3.Seller wise grouping -->shipment 
    const shipmentsMap = {}
    order.items.forEach((item) => {
        const sellerId = item.seller?.toString();
        // sellerId = "abc123"

        if (!shipmentsMap[sellerId]) {
            shipmentsMap[sellerId] = []
            /*
                {
                    "abc123": []
                }
            */
        }

        shipmentsMap[sellerId].push(item._id);
        /*
            {
                "abc123": ["order_id_1","order_id_2"]
            }
        */
    });

    // 4. Creating shipment after order 
    // Build the shipment object from shipmentmap
    const shipments = Object.keys(shipmentsMap).map((sellerId) => ({
        seller: sellerId,
        orderItems: shipmentsMap[sellerId],
        status: "pending",
        statusHistory: [
            {
                status: "pending",
                timestamp: new Date()
            }

        ]
    }));

    // 5. Estimated Delivery
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    // 6.Update order 
    const shipmentUpdate = {
        shipments: shipments,
        estimatedDelivery: estimatedDelivery

    }

    const finalOrder = await orderRepo.updateOrderById(order._id, shipmentUpdate, session);

    return finalOrder;
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

// Derie Order service 
const deriveOrderStatus = (order, sellerId) => {
    const sellerShipments = order.shipments.filter(
        s => String(s.seller) === String(sellerId)
    );

    console.log("Shipment orders", sellerShipments);

    const statuses = sellerShipments.map(s => s.status);

    if (statuses.every(s => s === "delivered" || s === "cancelled")) {
        return "completed";
    }

    if (statuses.some(s => ["accepted", "packed", "shipped", "out_for_delivery"].includes(s))) {
        return "processing";
    }

    return "pending";
};

/*
    only three order Status added now 
    completed
    processing
    pending

*/
const getSellerOrdersService = async (sellerId, status) => {
    if (!sellerId) {
        throw new ValidationError("Seller id is required");
    }
    // Fetch all orders containing this seller's items.
    // Seller-specific status is derived from shipments below.
    const orders = await orderRepo.findOrderBySellerID(sellerId);

    if (!orders || orders.length === 0) return [];

    const enrichedOrders = orders.map(order => {
        const derivedStatus = deriveOrderStatus(order, sellerId);

        return {
            ...order.toObject(),
            sellerStatus: derivedStatus
        }
    });

    if (status) {
        const filtered = enrichedOrders.filter((o) => o.sellerStatus === status);
        return filtered || [];
    }

    return enrichedOrders || [];

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


const generateTrackingOrder = () => {
    return "TRK_id" + Date.now() + Math.floor(Math.random() * 1000);
}

// Future multiple seller 
/*
    What not done yet (don't generate tracking id)
    - courier assign nahi hua
    - parcel ready nahi
    - pickup nahi hua

    Delivery-related status = Shipment level
    Order-level status = overall summary
*/

const updateOrderService = async (sellerId, orderId, status) => {
    if (!sellerId) throw new ValidationError("SellerId is not present");
    if (!orderId) throw new ValidationError("OrderId is not given");

    // 1. Fetch order
    const order = await orderRepo.findOrderById(orderId);
    if (!order) throw new NotfoundError("Order not found");

    // 2. Find seller shipment
    const shipment = order.shipments.find(
        (s) => s.seller.toString() === sellerId.toString()
    );

    if (!shipment) {
        throw new AuthError("You cannot update this shipment");
    }

    // OPTIONAL: status transition validation 
    const validTransitions = {
        pending: ["accepted"],
        accepted: ["packed"],
        packed: ["shipped"],
        shipped: ["out_for_delivery"],
        out_for_delivery: ["delivered"],
    };

    if (shipment.status !== status) {
        if (!validTransitions[shipment.status]?.includes(status)) {
            throw new ValidationError(
                `Invalid status transition from ${shipment.status} to ${status}`
            );
        }
    }

    // 3. Update shipment
    shipment.status = status;

    shipment.statusHistory.push({
        status,
        timestamp: new Date()
    });

    // 4. Tracking logic
    if (status === "shipped" && !shipment.trackingId) {
        shipment.trackingId = generateTrackingOrder();
        shipment.courier = "Delhivery";
    }

    // 5. Derive order status from shipment status not manually update 
    /*
        Order.status = summary of all shipments + payment state
    */

    /*  
        - created ->default
        - paid ->two case 1.COD and ONLINE
    */
    // derive only completion here
    const shipmentStatuses = order.shipments.map(s => s.status);

    if (shipmentStatuses.every(s => s === "delivered")) {
        order.status = "completed";
    } else {
        order.status = "processing"
    }

    // 6. Save full document 
    const updatedOrder = await orderRepo.saveOrder(order);
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
    updateOrderService,
    cancelOrderService,
    getOrdersStatusService
}