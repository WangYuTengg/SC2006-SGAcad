import express from "express";
import { getUserReviews } from "../controllers/reviews.js";
import {
    getUser,
    getUserFavoriteSpots,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * Get a user by ID.
 * @route GET /users/:id
 * @param {string} id.path.required - The ID of the user to retrieve.
 * @returns {User.model} 200 - The requested user.
 * @returns {Error} 404 - The user was not found.
 */
router.get("/:id", getUser);

/**
 * Get a user's reviews by ID.
 * @route GET /users/:id/reviews
 * @param {string} id.path.required - The ID of the user whose reviews to retrieve.
 * @returns {Array.<Review>} 200 - The requested reviews.
 * @returns {Error} 404 - The user was not found.
 */
router.get("/:id/reviews", getUserReviews);

/**
 * Get a user's favorite study spots by ID.
 * @route GET /users/:id/favorite-spots
 * @param {string} id.path.required - The ID of the user whose favorite study spots to retrieve.
 * @header {string} Authorization - The user's JWT access token.
 * @returns {Array.<StudySpot>} 200 - The requested study spots.
 * @returns {Error} 404 - The user was not found.
 */
router.get("/:id/favorite-spots", verifyToken, getUserFavoriteSpots);

export default router;
