const { DatabaseError, ValidationError } = require("../../shared/errors");

const { updateProductById } = require("../products/product.repository");

const {
    createReview,
    findReviewsByProductId,
    findReviewsByUserId,
    findByIdAndUpdateReview,
    findByIdAndDeleteReview,
    findByIdAndUpdateReviewImg,
    findByIdAndDeleteReviewImg,
    findReviewById,
} = require("./review.repository");


// ===============================
// Recalculate rating
// ===============================

const recalcProductRating = async (productId) => {

    const reviews = await findReviewsByProductId(productId);

    if (!reviews || reviews.length === 0) {
        await updateProductById(productId, {
            rating: 0,
            totalReviews: 0,
        });
        return;
    }

    const total = reviews.length;

    const sum = reviews.reduce(
        (acc, r) => acc + r.rating,
        0
    );

    const avg = sum / total;
    await updateProductById(productId, {
        rating: Number(avg.toFixed(1)),
        totalReviews: total,
    });
};



// ===============================
// Create Review Service
// ===============================

const createReviewService = async (
    productId,
    data,
    userId,
    urls = []
) => {

    const review = await createReview({
        ...data,
        product: productId,
        user: userId,
        reviewImages: urls?.length ? urls : []
    });

    if (!review) {
        throw new DatabaseError(
            "Error in creation of review"
        );
    }

    await recalcProductRating(productId);

    return review;
};

const findReviewService = async (reviewId) => {
    if (!reviewId) {
        throw new ValidationError("Review id is not provided ");
    }
    const review = await findReviewById(reviewId);
    if (!review) {
        throw new DatabaseError("Review not persent");
    }
    return review;
}

const getProductReviewServices = async (productId) => {
    if (!productId) {
        throw new DatabaseError("Product id is reuired");
    }
    const products = await findReviewsByProductId(productId);
    if (!products || products.length === 0) {
        return [];
    }
    return products;

}
const getMyReviewsService = async (userId) => {
    if (!userId) {
        throw new ValidationError("User id is required");
    }

    const reviews = await findReviewsByUserId(userId);
    if (!reviews || reviews.length === 0) {
        return [];
    }

    return reviews;
};
const updateReviewServices = async (reviewId, data) => {
    if (!reviewId) {
        throw new DatabaseError("Product id is required");
    }
    if (!data) {
        throw new ValidationError("Data is not provided");
    }
    const products = await findByIdAndUpdateReview(reviewId, data);
    if (!products || products.length === 0) {
        return [];
    }
    return products;

}
const deleteReviewServices = async (reviewId) => {
    if (!reviewId) {
        throw new DatabaseError("Product id is required");
    }
    const products = await findByIdAndDeleteReview(reviewId);
    if (!products || products.length === 0) {
        return [];
    }
    return products;

}

const updateReviewImageService = async (reviewId, url,) => {
    if (!reviewId) {
        throw new ValidationError("User or reviewId is not Provided");
    }
    // const toUpdate = {
    //     ...data,
    //     user: userId,

    // }
    const review = await findByIdAndUpdateReviewImg(reviewId, url);
    if (!review) {
        throw new DatabaseError("Review not updated | Review not found");
    }
    return review;

}
const delteReviewImageService = async (reviewId) => {
    if (!reviewId) {
        throw new ValidationError("User or reviewId is not Provided");
    }

    const review = await findByIdAndDeleteReviewImg(reviewId);
    if (!review) {
        throw new DatabaseError("Review not updated | Review not found");
    }
    return review;

}


module.exports = {
    createReviewService,
    recalcProductRating,
    getProductReviewServices,
    getMyReviewsService,
    findReviewService,
    updateReviewServices,
    deleteReviewServices,

    // Image service 
    updateReviewImageService,
    delteReviewImageService,
};


