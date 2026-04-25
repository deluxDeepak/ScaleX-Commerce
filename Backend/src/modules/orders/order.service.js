const { DatabaseError, ValidationError, NotfoundError, AuthError } = require("../../shared/errors");
const { findProductByid } = require("../products/product.repository")
const orderRepo = require("./order.repository");


const createOrderService = async (items, userId, address, paymentMethod) => {
    // ======Create snapShot =======
    // Fetch the product and create sanpshot 

    const orderItems = [];
    let totalPrice = 0;
    for (let item of items) {
        // 1.Check if the product is persent or not 
        const product = await findProductByid(item.productId);
        if (!product) {
            throw new DatabaseError("Product is not persent");
        }

        // Create a sanpshot 
        const orderItem = {
            product: product._id,
            name: product.name,
            price: product.price,
            qty: item.qty,
            image: product.image,
        };

        totalPrice += product.price * item.qty


        orderItems.push(orderItem);
    }

    // Now create the order 
    const orderSummary = {
        user: userId,
        items: orderItems,
        totalPrice,
        address,
        paymentMethod,
    }

    const order = await orderRepo.createOrder(orderSummary);

    return order;
}

const getMyOrdersService = async (userId) => {
    if (!userId) {
        throw new ValidationError("User is required ");
    }

    const orders = await orderRepo.findMyOrders(userId);
    return orders || []
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
    getSingleOrderService,
    acceptOrderService,
    cancelOrderService,
    getOrdersStatusService
}