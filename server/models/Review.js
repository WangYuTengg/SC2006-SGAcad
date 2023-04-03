import mongoose from "mongoose";

// Review entity module

/**
 * The review schema for Mongoose.
 * @typedef {Object} Review
 * @property {string} userId - The user ID associated with the review.
 * @property {string} spotId - The study spot ID associated with the review.
 * @property {number} rating - The rating given to the study spot.
 * @property {string} comment - The comment given by the user.
 * @property {Date} createdAt - The creation date of the review.
 * @property {Date} updatedAt - The last update date of the review.
 */
const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        spotId: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true,
            max: 150
        },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;