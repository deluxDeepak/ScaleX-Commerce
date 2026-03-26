const Cart = require("./cart.model")

// Interact with db only 
// Cart items get kar sakte hai itna heavy nahi hoga 
const findItemAll = async () => {
    return await Cart.find().lean();
}

// return the details product 
const findCartByUser = async (userId) => {
    return await Cart.findOne({ userId }).populate("items.productId").lean();

}
const createItem = async (data) => {
    return await Cart.create(data);
}
// const findAndDeleteCartItem = async (cartItemsId) => {
//     return await Cart.findByIdAndDelete(cartItemsId);
// }
const findAndDeleteCartItem = async (cartId, cartItemsId) => {
    return await Cart.findOneAndUpdate(
        { _id: cartId },
        {
            $pull: {
                items: { _id: cartItemsId }
            }
        },
        { new: true }
    );
};

// const findAndUpdateCartItem = async (cartItemsId, data) => {
//     return await Cart.findByIdAndUpdate(cartItemsId, data, { new: true });
// }
// Update karna hai embeded ko to 
const findAndUpdateCartItem = async (cartItemsId, data) => {
    return await Cart.findByIdAndUpdate(cartItemsId, data, { new: true });
}
// Update cart inside the cart scehma 
const UpdateCartItem = async (cartId, cartItemsId, data) => {
    return await Cart.findOneAndUpdate(
        {
            _id: cartId,
            "items._id": cartItemsId
        },
        { $set: { "items.$.quantity": data.quantity } },
        { new: true });
}
const updateCartByUser = async (userId, items) => {
    return await Cart.findOneAndUpdate(
        { userId },
        { items },
        { new: true }
    );
};

const clearCartByUser = async (userId) => {
    return await Cart.findOneAndUpdate(
        { userId },
        { items: [] },
        { new: true }
    );
};

module.exports = {
    findItemAll,
    findCartByUser,
    findAndDeleteCartItem,
    findAndUpdateCartItem,
    UpdateCartItem,
    clearCartByUser,
    createItem,
    updateCartByUser,
}