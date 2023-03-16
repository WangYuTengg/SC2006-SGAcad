import mongoose from "mongoose";

const StudySpotSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 1
        },
        description: {
            type: String,
            required: true,
            max: 150
        },
        picturePath: {
            type: String,
            default: ""
        },
        location: String
    },
    { timestamps: true}
);

const StudySpot = mongoose.model("StudySpot", StudySpotSchema);

export default StudySpot;
