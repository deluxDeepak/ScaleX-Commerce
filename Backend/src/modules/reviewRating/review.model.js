const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true, // denormalized
        },

        title: {
            type: String,
            trim: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        description: String,

        comment: {
            type: String,
            trim: true,
        },

        reviewImages: [String],
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;