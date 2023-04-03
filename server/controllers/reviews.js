import Review from "../models/Review.js";

// ReviewController module

/**
 * Create a new review for a study spot.
 * @route POST /studyspots/:spotId/reviews
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request URL parameters.
 * @param {string} req.params.spotId - Study spot ID.
 * @param {Object} req.body - Request body data.
 * @param {string} req.body.userId - ID of the user who creates the review.
 * @param {number} req.body.rating - Rating given by the user.
 * @param {string} req.body.comment - Comment provided by the user.
 * @param {Object} res - Express response object.
 */
export const createReview = async (req, res) => {
    try {
        const { userId, rating, comment} = req.body;
        const { spotId } = req.params;
        //const user = await User.findById(userId);
        const newReview = new Review({
            userId,
            spotId,
            rating,
            comment
        });

        await newReview.save();

        const review = await Review.find();
        res.status(201).json(review);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
};

/**
 * Get all reviews for a specific study spot.
 * @route GET /studyspots/:spotId/reviews
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request URL parameters.
 * @param {string} req.params.spotId - Study spot ID.
 * @param {Object} res - Express response object.
 */
export const getSpotReviews = async (req, res) => {
    try {
        const { spotId } = req.params; // if url contains ":spotId", then req.params will contain spotId: ""
        const review = await Review.find({ spotId });
        res.status(200).json(review);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


/**
 * Get all reviews created by a specific user.
 * @route GET /users/:id/reviews
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request URL parameters.
 * @param {string} req.params.id - User ID.
 * @param {Object} res - Express response object.
 */
export const getUserReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = id;
        console.log(id);
        const review = await Review.find({ userId });
        res.status(200).json(review);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}