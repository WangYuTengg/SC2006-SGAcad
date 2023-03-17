import express from "express";
import { verify } from "jsonwebtoken";
import { getUserReviews } from "../controllers/reviews.js";
import {
    getUser,
    getUserFavoriteSpots,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", getUser);
router.get("/:id/reviews", getUserReviews);
router.get("/:id/favorite-spots", getUserFavoriteSpots);


export default router;