import mongoose from "mongoose";

// User entity module

/**
 * The user schema for Mongoose.
 * @typedef {Object} User
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The hashed password of the user.
 * @property {string} picturePath - The file path of the user's profile picture.
 * @property {Array} favoriteSpots - The list of study spot IDs favorited by the user.
 * @property {Array} reviews - The list of reviews written by the user.
 * @property {Date} createdAt - The creation date of the user.
 * @property {Date} updatedAt - The last update date of the user.
 */
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 12
        },
        picturePath: {
            type: String,
            default: "",
        },
        favoriteSpots: {
            type: Array,
            default: [],
        },
        reviews: {
            type: Array,
            default: [],
        },
    }, {timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;