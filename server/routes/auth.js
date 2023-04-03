import express from 'express';
import { login, register } from "../controllers/auth.js";

const router = express.Router();

/**
 * Log in a user.
 * @route POST /auth/login
 * @param {string} email.body.required - The email address of the user.
 * @param {string} password.body.required - The password of the user.
 * @returns {Object} 200 - The user's JWT and details.
 * @returns {Error} 400 - The user does not exist or the credentials are invalid.
 * @returns {Error} 500 - An error occurred while processing the request.
 */
router.post("/login", login);

/**
 * Register a new user.
 * @route POST /auth/register
 * @param {string} firstName.body.required - The first name of the user.
 * @param {string} lastName.body.required - The last name of the user.
 * @param {string} email.body.required - The email address of the user.
 * @param {string} password.body.required - The password of the user.
 * @returns {User.model} 201 - The created user.
 * @returns {Error} 500 - An error occurred while processing the request.
 */
router.post("/register", register);

export default router;