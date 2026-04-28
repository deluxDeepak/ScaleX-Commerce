const Order = require("./order.model")

// Single object (NO session) 
// Transactions internally MongoDB ke insertMany pattern pe based hote hain
// create([data])  ---> array  ---> bulk / transaction safe
// Internally treated as bulk insert 
const createOrder = async (data, session) => {
    const [order] = await Order.create([data], { session });
    return order;
}

const findMyOrders = async (userId) => {
    return Order.find({ user: userId })

}

// Optimization is possible here 
const findOrders = async (query) => {
    return Order.find(query);

}

const findOrderBySellerID = async (sellerId, status) => {
    const query = { "items.seller": sellerId };

    if (typeof status === "string" && status.trim() !== "") {
        query.status = { $eq: status.trim() };
    }

    return Order.find(query);
}

const findSellerOrdersByProductIds = async (productIds, status) => {
    const query = {
        $or: [
            { "items.productId": { $in: productIds } },
            { "items.product": { $in: productIds } },
        ],
    };

    if (typeof status === "string" && status.trim() !== "") {
        query.status = { $eq: status.trim() };
    }

    return Order.find(query);
}



const findOrderById = async (orderId) => {
    return Order.findById(orderId);
}

const findOneOrder = async (orderId, userId) => {
    return Order.findOne({ user: userId, _id: orderId })
}

// This will change the update in direct mongoDb document 
const updateOrderById = async (orderId, data, session = null) => {
    return Order.findByIdAndUpdate(orderId, data, { new: true, session });
}

// persist modified order 
/*
    - document memory me aata hai
    - tum changes karte ho
    - mongoose track karta hai kya change hua
    - sirf modified fields update hoti hain
*/
const saveOrder = async (order, session = null) => {
    return order.save({ session });
};

module.exports = {
    createOrder,
    findMyOrders,
    findOrderById,
    findOneOrder,
    updateOrderById,
    saveOrder,
    findOrders,
    findSellerOrdersByProductIds,
    findOrderBySellerID,

}