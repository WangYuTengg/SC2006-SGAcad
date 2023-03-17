import Review from "../models/Review.js";
import User from "../models/User.js";

/* CREATE */
export const createReview = async (req, res) => {
    try {
        const { userId, spotId, rating, comment, picturePath} = req.body;
        //const user = await User.findById(userId);
        const newReview = new Review({
            userId,
            spotId,
            rating,
            comment,
            picturePath,
            likes: 0
        });

        await newReview.save();

        const review = await Review.find();
        res.status(201).json(review);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
};

/* READ */
export const getSpotReviews = async (req, res) => {
    try {
        const { spotId } = req.params; // if url contains ":spotId", then req.params will contain spotId: ""
        const review = await Review.find({ spotId });
        res.status(200).json(review);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserReviews = async (req, res) => {
    try {
        const { userId } = req.params;
        const review = await Review.find({ userId });
        res.status(200).json(review);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
// export const editReview = async (req, res) => {

// };