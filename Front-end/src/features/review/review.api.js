import { api } from "../../core/api/client"

// my reviews
export const getMyReviewApi = async () => {
    return await api.get("/review/my");
}

// product reviews --------yehan jarurat nahi hai -------------------
export const getProductReviewsApi = async (productId) => {
    return await api.get(`/review/${productId}`);
}

// create review
export const createReviewsApi = async (productId, data) => {
    return await api.post(`/review/${productId}`, data);
}

// update
export const updateReviewsApi = async (reviewId, data) => {
    return await api.patch(`/review/${reviewId}`, data);
}

// delete
export const deleteReviewsApi = async (reviewId) => {
    return await api.delete(`/review/${reviewId}`);
}

// router.patch("/:reviewId/img", authenticate, upload.multipleImage, updateReviewImage);
// router.delete("/:reviewId/img", authenticate, deleteReviewImage);
// Image update
export const updateReviewImageApi = async (reviewId) => {
    return await api.patch(`review/${reviewId}/img`);
}
// Delete all image 
export const deleteReviewImageApi = async (reviewId) => {
    return await api.delete(`review/${reviewId}/img`);
}
