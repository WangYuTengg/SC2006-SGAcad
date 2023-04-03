import express from "express";
import {
    createStudySpot,
    getAllStudySpots,
    getStudySpotById
} from "../controllers/studyspots.js";
import {
    createReview,
    getSpotReviews
} from "../controllers/reviews.js";
import { addRemoveFavorites } from "../controllers/users.js";

const router = express.Router();

/**
 * Create a new study spot.
 * @route POST /studyspots/create
 * @param {StudySpot.model} request.body.required - The study spot to create.
 * @returns {StudySpot.model} 201 - The created study spot.
 * @returns {Error} 409 - A conflict occurred while creating the study spot.
 */
router.post("/create", createStudySpot);

/**
 * Create a new review for a study spot.
 * @route POST /studyspots/:spotId/reviews
 * @param {string} spotId.path.required - The ID of the study spot to review.
 * @param {Review.model} request.body.required - The review to create.
 * @returns {Review.model} 201 - The created review.
 * @returns {Error} 409 - A conflict occurred while creating the review.
 */
router.post("/:spotId/reviews", createReview);

/**
 * Get all study spots.
 * @route GET /studyspots
 * @returns {Array.<StudySpot>} 200 - The list of study spots.
 * @returns {Error} 404 - No study spots were found.
 */
router.get("/", getAllStudySpots);

/**
 * Get a study spot by ID.
 * @route GET /studyspots/:id
 * @param {string} id.path.required - The ID of the study spot to retrieve.
 * @returns {StudySpot.model} 200 - The requested study spot.
 * @returns {Error} 404 - The study spot was not found.
 */
router.get("/:id", getStudySpotById);

/**
 * Get all reviews for a study spot by ID.
 * @route GET /studyspots/:spotId/reviews
 * @param {string} spotId.path.required - The ID of the study spot whose reviews to retrieve.
 * @returns {Array.<Review>} 200 - The requested reviews.
 * @returns {Error} 404 - The study spot was not found.
 */
router.get("/:spotId/reviews", getSpotReviews);

/**
 * Add or remove a study spot from a user's favorites.
 * @route PATCH /studyspots/:spotId/:userId
 * @param {string} spotId.path.required - The ID of the study spot to add or remove.
 * @param {string} userId.path.required - The ID of the user adding or removing the study spot.
 * @returns {Array.<StudySpot>} 200 - The user's updated list of favorite study spots.
 * @returns {Error} 404 - The user or study spot was not found.
 */
router.patch("/:spotId/:userId", addRemoveFavorites);

export default router;