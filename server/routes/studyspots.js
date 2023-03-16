import express from "express";
import {
    getAllStudySpots,
    getStudySpotById
} from "../controllers/studyspots.js";
import {
    getSpotReviews
} from "../controllers/reviews.js";

const router = express.Router();

/* READ */
router.get("/", getAllStudySpots);
router.get("/:id", getStudySpotById);
router.get("/:spotId/reviews", getSpotReviews);

export default router;