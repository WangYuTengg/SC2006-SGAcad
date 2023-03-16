import mongoose from "mongoose";

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
        picturePath: String,
        likes: Number
    },
    { timestamps: true}
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;