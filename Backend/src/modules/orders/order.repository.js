const Order = require("./order.model")

const createOrder = async (data) => {
    return Order.create(data);
}

const findMyOrders = async (userId) => {
    return Order.find({ user: userId })

}

// Optimization is possible here 
const findOrders = async (query) => {
    return Order.find(query);

}



const findOrderById = async (orderId) => {
    return Order.findById(orderId);
}

const findOneOrder = async (orderId, userId) => {
    return Order.findOne({ user: userId, _id: orderId })
}

const updateOrderById = async (orderId, data) => {
    return Order.findByIdAndUpdate(orderId, data, { new: true });
}

module.exports = {
    createOrder,
    findMyOrders,
    findOrderById,
    findOneOrder,
    updateOrderById,
    findOrders

}