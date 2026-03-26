const Review = require("./review.model")

const findReviewById = async (id) => {
    return await Review.findById(id).lean();
}
const createReview = async (data) => {
    return await Review.create(data);

}
const findReviewsByProductId = (productId) => {
    return Review.find({ product: productId });
};
// updatecontent 
const findByIdAndUpdateReview = (reviewId, data) => {
    return Review.findByIdAndUpdate(reviewId, data, { new: true });
};
// updateimage 
const findByIdAndUpdateReviewImg = (reviewId, url) => {
    return Review.findByIdAndUpdate(reviewId,
        { $set: { reviewImages: url } },
        { new: true });
};
const findByIdAndDeleteReviewImg = (reviewId) => {
    return Review.findByIdAndUpdate(reviewId,
        { $set: { reviewImages: [] } },
        { new: true });
};
const findByIdAndDeleteReview = (reviewId) => {
    return Review.findByIdAndDelete(reviewId);
};

module.exports = {
    findReviewById,
    createReview,
    findReviewsByProductId,
    findByIdAndUpdateReview,

    // Image 
    findByIdAndUpdateReviewImg,
    findByIdAndDeleteReviewImg,
    findByIdAndDeleteReview,
}