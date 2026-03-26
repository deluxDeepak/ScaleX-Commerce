// Service check if items exist or not 
// Only business logic here 
// Update cart items 
// delete cart items
// add cart items 

const logger = require("../../core/logger/logger");
const { NotfoundError, DatabaseError, ValidationError } = require("../../shared/errors");
const { getCartItemsAll } = require("./cart.controller");
const { findItemAll, findCartByUser, createItem, findAndDeleteCart, findAndDeleteCartItem, findAndUpdateCartItem, clearCartByUser, updateCartByUser, UpdateCartItem } = require("./cart.repository");

const getItemAllService = async () => {

    try {
        const data = await findItemAll();
        if (!data || data.length === 0) {
            logger.warn("Cart is Empty");

            return [];

        }
        return data;

    } catch (error) {
        logger.error("Error in fetching from the Databse")
        throw new DatabaseError("Error in fetching from the Databse");
    }
}
const getItemAllUserService = async (userId) => {
    if (!userId) {
        throw new ValidationError("Userid is not found")
    }
    logger.info({ userId }, "User id id");
    try {
        const data = await findCartByUser(userId);
        if (!data || data.length === 0) {
            logger.warn("Cart is Empty");

            return [];

        }
        return data;

    } catch (error) {
        logger.error("Error in fetching from the Databse")
        throw new DatabaseError("Error in fetching from the Databse");
    }
}

//================== Important =================
const addCartItemsService = async (item, userId) => {
    try {
        // item=req.body ayega 
        if (!item.productId) {
            throw new Error("ProductId is required");
        }
        if (!item.quantity || item.quantity < 0) {
            throw new Error("Invalid quantity");

        }

        // UserId ko find karna parega n verfiy karenge ki wo user exist kar rehe hai ya nahi 
        // oske name ka cart hai ye nahi 
        let cart = await findCartByUser(userId);
        console.log("Caart items is ", cart);

        if (!cart) {
            cart = await createItem({
                userId,
                items: [item]
            });
            return cart;
        }

        let items = cart.items || [];
        console.log("Items in cart ", items);

        // Agr cart exist karta hai to quantity increase 
        const existingItem = items.find(
            p => p.productId._id.toString() === item.productId
        );
        // const exist=items.find((p)=>{
        //     console.log(p.productId.toString());
        //     console.log(item.productId);
        // })


        if (existingItem) {
            console.log("Existing items", existingItem.quantity);
            console.log("Items quantity to add", item.quantity);
            existingItem.quantity += item.quantity;
        } else {
            items.push(item);
        }
        // update using repo
        const updatedCart = await updateCartByUser(
            userId,
            items
        );

        return updatedCart;

    } catch (error) {
        logger.error("Error in addCartItemsService")
        throw error

    }
}
const removeCartItemsService = async (cartItemsId, userId) => {

    // 1.Find the user with the cart 
    const userCart = await findCartByUser(userId);
    if (!userCart) {
        throw new NotfoundError("Product not Persent in cart Or deleted from the cart")
    }
    console.log("User cart is ", userCart);

    const item = userCart.items.find(
        item => item._id.toString() === cartItemsId
    );
    console.log("Items is from find", item);

    if (!item) {
        throw new NotfoundError("Cart items id not matched");
    }

    // 2.Remove the particular user with the cart
    const deletedCartItem = await findAndDeleteCartItem(userCart._id,cartItemsId);
    if (!deletedCartItem) {
        throw new NotfoundError("Cart items not persent in your Cart or Delted ")
    }

    return deletedCartItem;
}
const updateCartItemsService = async (cartItemsId, data, userId) => {

    const userCart = await findCartByUser(userId);
    if (!userCart) {
        throw new NotfoundError("Cart not found");
    }
    console.log("User cart is ", userCart);
    // items array hai 
    // if (userCart.items._id !== cartItemsId) {
    //     throw new NotfoundError("Cart items id not matched ");
    // }

    /*
        true and false return karega 
        const item = userCart.items.some(
            item => item._id.toString() === cartItemsId
        );
        console.log("Items is from find", item);
    */

    const item = userCart.items.find(
        item => item._id.toString() === cartItemsId
    );
    console.log("Items is from find", item);

    if (!item) {
        throw new NotfoundError("Cart items id not matched");
    }

    console.log("data.quantity", data.quantity)
    console.log("item.quantity", item.quantity)
    const oldQty = item.quantity;
    const newQty = oldQty + Number(data.quantity);

    if (newQty <= 0) {
        throw new ValidationError("Quantity cannot be 0");
    }




    if (!data.quantity) {
        throw new ValidationError("Quantity required");
    }

    const updatedCartItem = await UpdateCartItem(
        userCart._id,
        cartItemsId,
        { quantity: newQty }
    );

    if (!updatedCartItem) {
        throw new NotfoundError("Cart item not found");
    }

    return updatedCartItem;
}
const clearCartService = async (userId) => {

    // 1.Find the user with the cart 
    const cart = await clearCartByUser(userId);
    if (!cart) {
        throw new NotfoundError("Cart not found");
    }
    return cart;
}
const getCartCountService = async (userId) => {
    // 1.Find the cart 
    const cartUser = await findCartByUser(userId);
    // if (!cartUser) {
    //     throw new NotfoundError("Cart not found with User")
    // }

    // 2.Find the count in cart 
    const count = cartUser.items?.length || 0;
    logger.info({ count }, "Cart count");
    return count;


}

const getCartTotalPriceService = async (userId) => {
    // 1.Find the cart 
    const cartUser = await findCartByUser(userId);
    if (!cartUser) {
        throw NotfoundError("Cart not found with User")
    }

    // 2.Find the count in cart 
    const price = cartUser.totalPrice;
    logger.info({ price }, "Cart total price");
    return price;

};
const checkItemInCartService = async (userId, productId) => {

    const cart = await findCartByUser(userId);
    if (!cart) return null;

    const item = cart.items.find(
        i => i.productId.toString() === productId
    );

    return item || null;
};


module.exports = {
    getItemAllService,
    getItemAllUserService,
    addCartItemsService,
    removeCartItemsService,
    updateCartItemsService,
    getCartCountService,
    getCartTotalPriceService,
    clearCartService,
    checkItemInCartService
}