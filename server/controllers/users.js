import StudySpot from "../models/StudySpot.js";
import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFavoriteSpots = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      res.status(200).json(user.favoriteSpots);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

/* UPDATE */
export const addRemoveFavorites = async (req, res) => {
    try {
      const { spotId, userId } = req.params;
      const user = await User.findById(userId);

      if (user.favoriteSpots.includes(spotId)) {
        user.favoriteSpots = user.favoriteSpots.filter((id) => id !== spotId);

      } else {
        user.favoriteSpots.push(spotId);
      }

      await user.save();
      
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
}