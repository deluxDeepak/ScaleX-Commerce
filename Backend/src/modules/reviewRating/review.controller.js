const logger = require("../../core/logger/logger");
const { uploadObjectService, deleteObjectService } = require("../../core/storage/storage.services");
const { generateKey, getKeyFromUrl } = require("../../shared/utils/genKeys.utils");
const { findByIdAndUpdateReviewImg, findByIdAndDeleteReviewImg } = require("./review.repository");
const { createReviewService, getProductReviewServices, updateReviewServices, deleteReviewServices, findReviewService } = require("./review.service");

const createReview = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user.id;
        const files = req.files;
        if (!files) {
            return res.status(400).json({
                success: false,
                message: error.message || "Provide atleast one file"

            })
        }

        // const modifyData = {
        //     ...data,
        //     userId: userId
        // }


        const productId = req.params.productId;
        // User can be taken from the authenticate (pending)
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "product is required",
            });
        }

        const urls = [];
        if (files && files.length > 0) {
            for (let file of files) {

                const key = generateKey("profile", file.originalname);
                console.log("Key generated is ", key);
                const uploadRes = await uploadObjectService({
                    key: key,
                    body: file.buffer,
                    contentType: file.mimetype
                });
                console.log("Response key and url are ", uploadRes.key);

                urls.push(uploadRes.url);

            }


        }



        // const review = await createReviewService(productId, data);
        const review = await createReviewService(productId, data, userId, urls);
        res.status(200).json({
            success: true,
            review: review,
            message: "Review created Successfully"
        });
    } catch (error) {
        logger.error({ error }, "Error in creating Review")
        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}
const getProductReviews = async (req, res) => {
    const productId = req.params.productId;
    console.log("Product id is", productId);
    try {
        const reviews = await getProductReviewServices(productId);
        res.status(200).json({
            success: true,
            reviews: reviews,
            message: "Review fetch Successfully"
        });

    } catch (error) {
        logger.error({ error }, "Error in fetching Review")
        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}
const updateReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    console.log("Product id is", reviewId);
    const data = req.body;
    try {
        const reviews = await updateReviewServices(reviewId, data);
        res.status(200).json({
            success: true,
            reviews: reviews,
            message: "Review Updated Successfully"
        });

    } catch (error) {
        logger.error({ error }, "Error in Updating Review")
        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}
const deleteReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    console.log("Product id is", reviewId);
    try {
        const reviews = await deleteReviewServices(reviewId);
        res.status(200).json({
            success: true,
            reviews: reviews,
            message: "Review delted Successfully"
        });

    } catch (error) {
        logger.error({ error }, "Error in deleting Review")
        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

const updateReviewImage = async (req, res) => {
    const files = req.files
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    if (!files) {
        return res.status(400).json({
            success: false,
            message: error.message || "Provide atleast one file"

        })
    }

    try {
        const urls = [];

        for (let file of files) {

            const key = generateKey("profile", file.originalname);
            console.log("Key generated is ", key);
            const uploadRes = await uploadObjectService({
                key: key,
                body: file.buffer,
                contentType: file.mimetype
            });
            console.log("Response key and url are ", uploadRes.key);

            urls.push(uploadRes.url);

        }

        const review = await findByIdAndUpdateReviewImg(reviewId, urls);
        res.status(200).json({
            success: true,
            review: review,
            message: "Review image updated Successfully"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "File is not Provided"

        })
    }
}
const deleteReviewImage = async (req, res) => {
    const { reviewId } = req.params;
    try {

        console.log("review imge is revie", reviewId);
        // 1.find review from the db first and then url 
        const reviewRaw = await findReviewService(reviewId);
        console.log("Review is ", reviewRaw);


        const key = getKeyFromUrl(reviewRaw?.reviewImages[0]);
        console.log("Key form the url is ", key);
        const uploadRes = await deleteObjectService({
            key: key,
        });

        console.log("Response key and url are ", uploadRes.key);

        const review = await findByIdAndDeleteReviewImg(reviewId);
        res.status(200).json({
            success: true,
            review: review,
            message: "Review image delte Successfully"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "File is not Delted"

        })

    }

}
const getMyReviews = async (req, res) => {

}
module.exports = {
    createReview,
    updateReview,
    getMyReviews,
    deleteReview,
    getProductReviews,

    updateReviewImage,
    deleteReviewImage,
}