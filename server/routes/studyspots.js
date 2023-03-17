import express from "express";
import {
    createStudySpot,
    getAllStudySpots,
    getStudySpotById
} from "../controllers/studyspots.js";
import {
    getSpotReviews
} from "../controllers/reviews.js";
import { addRemoveFavorites } from "../controllers/users.js";

const router = express.Router();

/* CREATE */
router.post("/create", createStudySpot);

/* READ */
router.get("/", getAllStudySpots);
router.get("/:id", getStudySpotById);
router.get("/:spotId/reviews", getSpotReviews);

/* UPDATE */
router.patch("/:spotId/:userId", addRemoveFavorites);

export default router;