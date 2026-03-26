// All cart routes are here 
const router = require("express").Router();
const authenticate = require("../../middlewares/auth.middleware");
const { getCartItemsAll, createCartItems, getCartItemsAllUser, addCartItems, updateCartItems, removeCartItems, getCartCount, clearCart, getCartTotalPrice, checkItemInCart } = require("./cart.controller");

// -------->api/cart/cart-items
// Har ek cart me auth middleware add kar denge 
router.get("/cart-items", getCartItemsAll);
// Basic crud operation on cart =========================
router.get("/", authenticate, getCartItemsAllUser);              // current user cart

// User se realted ========================
router.delete("/clear", authenticate, clearCart);         // clear all

router.get("/count", authenticate, getCartCount);   //Cart count (navbar show)
router.get("/total", authenticate, getCartTotalPrice);   //cart total price

//check product in a cart (ye product hai ki nahi cart me )
router.get("/check/:productId", authenticate, checkItemInCart);


router.post("/:productId/add", authenticate, addCartItems);        // add item
router.patch("/:id", authenticate, updateCartItems);     // update qty
router.delete("/:id", authenticate, removeCartItems);     // remove one




module.exports = router;