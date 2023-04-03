import mongoose from "mongoose";

// StudySpot entity module

/**
 * The study spot schema for Mongoose.
 * @typedef {Object} StudySpot
 * @property {number} spotId - The unique ID of the study spot.
 * @property {string} name - The name of the study spot.
 * @property {string} description - The description of the study spot.
 * @property {string} picturePath - The file path of the study spot's picture.
 * @property {boolean} isLibrary - Indicates whether the study spot is a library.
 * @property {Object} misc - Miscellaneous information about the study spot.
 * @property {string} misc.freeWifi - Indicates whether free Wi-Fi is available at the study spot.
 * @property {string} misc.freeSeating - Indicates whether free seating is available at the study spot.
 * @property {Object} misc.openingHours - The opening hours of the study spot.
 * @property {string} misc.openingHours.weekdays - The opening hours on weekdays.
 * @property {string} misc.openingHours.weekends - The opening hours on weekends.
 * @property {string} misc.phoneNumber - The phone number of the study spot.
 * @property {string} misc.websiteURL - The website URL of the study spot.
 * @property {Object} location - The location of the study spot.
 * @property {string} location.address - The address of the study spot.
 * @property {string} location.postal - The postal code of the study spot.
 * @property {string} location.type - The type of location (always "Point").
 * @property {Array.<number>} location.coordinates - The longitude and latitude coordinates of the study spot.
 * @property {Date} createdAt - The creation date of the study spot.
 * @property {Date} updatedAt - The last update date of the study spot.
 */
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
                    default: "10am - 9pm",
                },
                weekends: {
                    type: String,
                    default: "10am - 9pm",
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