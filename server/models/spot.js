import mongoose from "mongoose";

const StudySpotSchema = new mongoose.Schema(
    {
        // needs to be filled
    }, {timestamps: true }
);

const StudySpot = mongoose.model("StudySpot", StudySpotSchema);
export default StudySpot;