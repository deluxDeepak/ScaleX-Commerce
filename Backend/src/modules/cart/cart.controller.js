const { getItemAllUserService, addCartItemsService, removeCartItemsService, updateCartItemsService, getCartCountService, clearCartService, getCartTotalPriceService, checkItemInCartService, getItemAllService, } = require("./cart.service")

const getCartItemsAll = async (req, res) => {
    try {
        const items = await getItemAllService();
        res.status(200).json({
            success: true,
            data: items,
            message: "Cart items fetched ."
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",

        })

    }

}
const getCartItemsAllUser = async (req, res) => {
    const userId = req.user.id
    try {
        const items = await getItemAllUserService(userId);
        res.status(200).json({
            success: true,
            cart: items,
            message: "Cart items fetched successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        })

    }

}
const addCartItems = async (req, res) => {

    try {
        const userId = req.user.id
        const productId = req.params.productId;
        const { quantity, price } = req.body;
        console.log("Requested body is", req.body);
        const item = { quantity, productId, price }
        // 1.Product id find then update or add 
        const items = await addCartItemsService(item, userId);
        res.status(200).json({
            success: true,
            cart: items,
            message: "Cart items addedd successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        })

    }

}
const removeCartItems = async (req, res) => {

    try {
        const userId = req.user.id;
        const cartItemsId = req.params.id;
        const items = await removeCartItemsService(cartItemsId, userId);
        res.status(200).json({
            success: true,
            cart: items,
            message: "Cart items removed successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        })

    }

}
const updateCartItems = async (req, res) => {

    try {
        const userId = req.user.id;
        const cartItemsId = req.params.id;
        const data = req.body;
        console.log("Data is ", data);

        const items = await updateCartItemsService(cartItemsId, data, userId);
        res.status(200).json({
            success: true,
            cart: items,
            message: "Cart items updated successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        })

    }
}
const clearCart = async (req, res) => {

    try {
        const userId = req.user.id;
        const items = await clearCartService(userId);
        res.status(200).json({
            success: true,
            cart: items,
            message: "Cart items clear successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        })

    }

}
const getCartCount = async (req, res) => {

    try {
        const userId = req.user.id;
        const count = await getCartCountService(userId);
        res.status(200).json({
            success: true,
            count: count,
            message: `Cart items count is ${count}`
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        })

    }

}
const getCartTotalPrice = async (req, res) => {

    try {
        const userId = req.user.id;
        const price = await getCartTotalPriceService(userId);
        res.status(200).json({
            success: true,
            price: price,
            message: `Cart items total Price is ${price}`
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        })

    }

}

const checkItemInCart = async (req, res) => {
    try {

        const userId = req.user.id;
        const productId = req.params.productId;

        const item = await checkItemInCartService(userId, productId);

        res.status(200).json({
            success: true,
            item: item || null,
            message: "Cart items fetched "
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};







module.exports = {
    getCartItemsAll,
    getCartItemsAllUser,
    addCartItems,
    updateCartItems,
    removeCartItems,

    clearCart,
    getCartCount,
    getCartTotalPrice,
    checkItemInCart
}