import mongoose from "mongoose";

// StudySpotSubmitted entity module

/**
 * The study spot submitted schema for Mongoose.
 * @typedef {Object} StudySpotSubmitted
 * @property {string} name - The name of the study spot.
 * @property {string} description - The description of the study spot.
 * @property {string} picturePath - The file path of the study spot's picture.
 * @property {string} address - The address of the study spot.
 * @property {string} postal - The postal code of the study spot.
 * @property {Date} createdAt - The creation date of the study spot.
 * @property {Date} updatedAt - The last update date of the study spot.
 */
const StudySpotSubmittedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
      min: 1,
    },
    postal: {
      type: String,
      minlength: 6,
      maxlength: 6,
      required: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudySpotSubmitted = mongoose.model(
  "StudySpotSubmitted",
  StudySpotSubmittedSchema
);

export default StudySpotSubmitted;
