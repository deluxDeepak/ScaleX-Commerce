const authenticate = require("../../middlewares/auth.middleware");
const {
    createReview,
    updateReview,
    getMyReviews,
    deleteReview,
    getProductReviews,
    deleteReviewImage,
    updateReviewImage
} = require("./review.controller");
const upload = require("../../core/upload/upload.middleware");

const router = require("express").Router();


router.get("/my", authenticate, getMyReviews);
router.patch("/:reviewId/img", authenticate, upload.multipleImage, updateReviewImage);
router.delete("/:reviewId/img", authenticate, deleteReviewImage);

router.get("/:productId", getProductReviews);   //Done

//yehi image bhi uplaod kar do 
router.post("/:productId", authenticate, upload.multipleImage, createReview);  
 
router.patch("/:reviewId", authenticate, updateReview);  //Done
router.delete("/:reviewId", authenticate, deleteReview);     //Done



module.exports = router;