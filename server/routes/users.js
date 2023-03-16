import express from "express";
import { verify } from "jsonwebtoken";
import {
    getUser,
    getUserFavoriteSpots,
    getUserReviews,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/FavoriteSpots", verifyToken, getUserFavoriteSpots);

/* UPDATE */
router.patch("/:id/:FavoriteSpotId", verifyToken, addRemoveFavorites);

export default router;