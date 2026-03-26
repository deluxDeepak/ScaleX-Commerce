const Review = require("../../src/modules/reviewRating/review.model");
const getReview = require("./data/reviewData");

const seedReview = async () => {

    await Review.deleteMany();

    const reviewData = await getReview();
    const reviews = await Review.insertMany(reviewData);

    console.log("Review created ");
    return reviews
}

module.exports = seedReview;