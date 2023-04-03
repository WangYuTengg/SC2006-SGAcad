import StudySpot from "../models/StudySpot.js";
import User from "../models/User.js";

// UserController module

/**
 * Retrieves a user by its ID.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The user object.
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Retrieves a user's favorite study spots.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} The list of formatted favorite study spots.
 */
export const getUserFavoriteSpots = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      const favorites = await Promise.all(
        user.favoriteSpots.map((id) => StudySpot.findById(id))
      );
      const formattedFavorites = favorites.map(
        ({_id, spotId, name, description, picturePath, location}) => {
          return {_id, spotId, name, description, picturePath, location};
        }
      );

      res.status(200).json(formattedFavorites);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

/**
 * Adds or removes a study spot from a user's favorites.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} The list of formatted favorite study spots.
 */
export const addRemoveFavorites = async (req, res) => {
    try {
      const { spotId, userId } = req.params;
      const user = await User.findById(userId);
      const favorite = await StudySpot.findById(spotId);

      if (user.favoriteSpots.includes(spotId)) {
        user.favoriteSpots = user.favoriteSpots.filter((id) => id !== spotId);

      } else {
        user.favoriteSpots.push(spotId);
      }

      await user.save();
      
      const favorites = await Promise.all(
        user.favoriteSpots.map((id) => StudySpot.findById(id))
      );
      const formattedFavorites = favorites.map(
        ({_id, spotId, name, description, picturePath, misc, location}) => {
          return {_id, spotId, name, description, picturePath, misc, location};
        }
      );

      res.status(200).json(formattedFavorites);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
}
