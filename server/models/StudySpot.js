import mongoose from "mongoose";

const StudySpotSchema = new mongoose.Schema(
    {
        spotId: {
            type: Number,
            unique: true,
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
            max: 500
        },
        picturePath: {
            type: String,
            default: ""
        },
        isLibrary: {
            type: Boolean,
            default: false,
        },
        misc: {
            freeWifi:{
                type: String,
                default: "Not available",
            },
            freeSeating: {
                type: String,
                default: "Available",
            },
            openingHours: {
                weekdays: {
                    type: String,
                    default: "8am - 9pm",
                },
                weekends: {
                    type: String,
                    default: "10am - 8pm",
                }
            },

            phoneNumber:{
                type: String,
                default: "Not available"
            },

            websiteURL: {
                type: String,
                default: "null",
            }
        },
        location: {
            address: {
                type: String,
                required: true,
            },
            postal: {
                type: String,
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
