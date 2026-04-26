const router = require("express").Router();
const { addToWishlist, getMyWishlist, removeFromWishlist, checkWishlistStatus } = require("./wishlist.controller");




router.post("/:productId", addToWishlist);
router.get("/", getMyWishlist);
router.delete("/:productId", removeFromWishlist);
router.get("/check/:productId", checkWishlistStatus);

// optional
// router.post("/toggle/:productId", toggleWishlist);

module.exports = router;