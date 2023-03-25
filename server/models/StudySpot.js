import mongoose from "mongoose";

const StudySpotSchema = new mongoose.Schema(
    {
        spotId: {
            type: Number,
            required: true,
        },

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
        location: {
            address: {
                type: String,
                required: true,
            },
            postal: {
                type: Number,
                minlength: 6,
                maxlength: 6,
                required: true,
            },
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
    },
    { timestamps: true}
);

const StudySpot = mongoose.model("StudySpot", StudySpotSchema);

export default StudySpot;
