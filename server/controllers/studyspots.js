import StudySpot from "../models/StudySpot.js";

// StudySpotController module

/**
 * Creates a new study spot.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The list of all study spots including the newly created spot.
 */
export const createStudySpot = async (req, res) => {
  try {
    const { spotId, name, description, picturePath, location } = req.body;
    const newStudySpot = new StudySpot({
      spotId,
      name,
      description,
      picturePath,
      location,
    });
    await newStudySpot.save();

    const studyspot = await StudySpot.find();
    res.status(201).json(studyspot);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/**
 * Retrieves all study spots.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The list of all study spots in database.
 */
export const getAllStudySpots = async (req, res) => {
  try {
    const studyspot = await StudySpot.find();
    res.status(200).json(studyspot);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Retrieves a study spot by its ID.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The study spot object.
 */
export const getStudySpotById = async (req, res) => {
  try {
    const { id } = req.params;
    const studyspot = await StudySpot.findById(id);
    res.status(200).json(studyspot);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


