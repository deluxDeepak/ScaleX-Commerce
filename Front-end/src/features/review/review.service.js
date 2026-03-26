import { createReviewsApi, deleteReviewImageApi, deleteReviewsApi, getMyReviewApi, getProductReviewsApi, updateReviewImageApi } from "./review.api";

// my reviews
export const getMyReviewService = async () => {
    const res = await getMyReviewApi();
    return res.data;
}

// product reviews
export const getProductReviewsService = async (productId) => {
    const res = await getProductReviewsApi(productId);
    return res.data;
}

// create review file-automatically handle karega axios use formdata
export const createReviewsService = async (productId, data) => {
    try {
        const res = await createReviewsApi(productId, data);
        return res.data;
    } catch (error) {
        throw new Error("axios error", error);

    }
}

// update
export const updateReviewsService = async (reviewId, data) => {
    const res = await updateReviewsService(reviewId, data);
    return res.data;
}

// delete
export const deleteReviewsService = async (reviewId) => {
    const res = await deleteReviewsApi(reviewId);
    return res.data;
}

// Update image 
export const updateReviewImageService = async (reviewId) => {
    const res = await updateReviewImageApi(reviewId);
    return res.data;
}
// Delete all image 
export const deleteReviewImageService = async (reviewId) => {
    const res = await deleteReviewImageApi(reviewId);
    return res.data;
}